import { DbConnection, subAccount, transaction } from 'db';
import { AccountList, StoreInitializer, TransactionList } from 'ui';
import { asc, desc } from 'drizzle-orm';
import { getAllTransactionPured } from 'utils';
export default async function Index() {
  const accountList = await DbConnection.instance().query.account.findMany({
    with: { sub_accounts: true },
  });
  const subAccountList =
    await DbConnection.instance().query.subAccount.findMany({
      orderBy: [asc(subAccount.type)],
    });
  const transactionListData =
    await DbConnection.instance().query.transaction.findMany({
      with: { subAccount: true, user: true },
      orderBy: [desc(transaction.createAt)],
    });
  const allTransactionPured = getAllTransactionPured(transactionListData);

  return (
    <>
      <StoreInitializer
        transactions={allTransactionPured}
        subAccounts={subAccountList}
        accountsList={accountList}
      />
      <AccountList />
      <section className={'container'}>
        <TransactionList />
      </section>
    </>
  );
}
