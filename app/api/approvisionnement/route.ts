import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getUserFromSession } from 'utils';
import { DbConnection, subAccount, transaction } from 'db';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const session = await getServerSession();
  const informations = getUserFromSession(session);
  const requestValues = (await request.json()) as {
    accountNumber: string;
    montant: number;
    commentaire: string;
  };

  try {
    const database = await DbConnection.instance();

    const currentSubAccount = await database.query.subAccount.findFirst({
      where: eq(subAccount.id, requestValues.accountNumber),
    });

    if (currentSubAccount) {
      const sumAmount =
        currentSubAccount.amount + parseFloat(`${requestValues.montant}`);

      await database.transaction(async (tx) => {
        await tx.insert(transaction).values({
          userId: `${informations?.id}`,
          subAccountId: currentSubAccount.id,
          amountBefore: currentSubAccount.amount,
          phoneNumber: 'Aucun',
          amount: requestValues.montant,
          clientName: `${informations?.fullName}`,
          numeroReference: 'Aucun',
          identityPiece: 'Aucune',
          transationType: 'Approvisionement',
          createAt: `${new Date().toISOString()}`,
          id: uuidv4(),
          updatedAt: `${new Date().toISOString()}`,
        });
        await tx
          .update(subAccount)
          .set({ amount: sumAmount })
          .where(eq(subAccount.id, requestValues.accountNumber));
      });
    }

    return NextResponse.json({ messageType: 'success' });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      messageType: 'error',
      message: 'There was an error while trying to provision this account',
    });
  }
}
