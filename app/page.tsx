import { DbConnection } from 'db';
import { AccountList, TransactionList } from 'ui';

export default async function Index() {
  const accountList = await DbConnection.instance().query.account.findMany({
    with: { sub_accounts: true },
  });

  return (
    <>
      <AccountList accountInformation={accountList} />
      <section className={'container'}>
        <TransactionList />
      </section>
    </>
  );
}
