import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getUserFromSession } from 'utils';
import { account, DbConnection, subAccount, transaction } from 'db';
import { like, eq, desc } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const session = await getServerSession();
  const informations = getUserFromSession(session);
  const requestValues = (await request.json()) as {
    accountNumber: string;
    montant: string;
    commentaire: string;
    phoneNumber: string;
    clientName: string;
    identityPiece: string;
    transactionNumber: string;
    transactionType: 'Depot' | 'Retrait' | 'Approvisionement';
  };
  try {
    const database = await DbConnection.instance();

    const allSubAccount = await database.query.subAccount.findMany();

    const currentSubAccount = allSubAccount.filter(
      (value) => value.id === requestValues.accountNumber
    )[0];

    const currentAccount = await database.query.account.findFirst({
      where: like(account.agentcode, '%Main%'),
    });
    const mainSubAccount = allSubAccount.filter(
      (value) =>
        value.transationGenre === 'MainAccount' &&
        value.accountNumber == currentAccount?.phonenumber &&
        value.devise === currentSubAccount.devise
    )[0];
    if (requestValues.transactionType === 'Depot') {
      if (currentSubAccount?.amount < parseFloat(requestValues.montant)) {
        return NextResponse.json({
          messageType: 'error',
          message:
            'The amount you provide is greater than the current amount available',
        });
      }
    } else if (requestValues.transactionType === 'Retrait') {
      if (mainSubAccount?.amount < parseFloat(requestValues.montant)) {
        return NextResponse.json({
          messageType: 'error',
          message:
            'The amount you provide is greater than the current amount available',
        });
      }
    }

    await database.transaction(async (tx) => {
      await tx.insert(transaction).values({
        transationType: requestValues.transactionType,
        numeroReference: requestValues.transactionNumber,
        amount: parseFloat(requestValues.montant),
        amountBefore: currentSubAccount?.amount,
        phoneNumber: requestValues.phoneNumber,
        identityPiece: requestValues.identityPiece,
        subAccountId: requestValues.accountNumber,
        clientName: requestValues.clientName,
        userId: `${informations?.id}`,
        createAt: `${new Date().toISOString()}`,
        id: uuidv4(),
        updatedAt: `${new Date().toISOString()}`,
      });
      if (requestValues.transactionType == 'Retrait') {
        await tx.transaction(async (tx2) => {
          await tx
            .update(subAccount)
            .set({
              amount:
                currentSubAccount?.amount + parseFloat(requestValues.montant),
            })
            .where(eq(subAccount.id, requestValues.accountNumber));
          await tx
            .update(subAccount)
            .set({
              amount:
                mainSubAccount?.amount - parseFloat(requestValues.montant),
            })
            .where(eq(subAccount.id, mainSubAccount.id));
        });
      } else if (requestValues.transactionType == 'Depot') {
        await tx.transaction(async (tx2) => {
          await tx
            .update(subAccount)
            .set({
              amount:
                currentSubAccount?.amount - parseFloat(requestValues.montant),
            })
            .where(eq(subAccount.id, requestValues.accountNumber));
          await tx
            .update(subAccount)
            .set({
              amount:
                mainSubAccount?.amount + parseFloat(requestValues.montant),
            })
            .where(eq(subAccount.id, mainSubAccount.id));
        });
      }
    });
    const transactionListData =
      await DbConnection.instance().query.transaction.findMany({
        with: { subAccount: true, user: true },
        orderBy: [desc(transaction.createAt)],
      });
    const accountList = await DbConnection.instance().query.account.findMany({
      with: { sub_accounts: true },
    });
    return NextResponse.json({
      messageType: 'success',
      transactions: transactionListData,
      accountList: accountList,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ messageType: 'error' });
  }
}
