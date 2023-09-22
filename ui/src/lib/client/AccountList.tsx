'use client';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { getColorForText } from 'utils';
import { useTransactionListState } from 'states';

export function AccountList() {
  const { accountsList } = useTransactionListState();
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className={'grid grid-cols-5 gap-6'}>
        {accountsList
          .sort((a, b) => {
            return a.agentcode.localeCompare(b.agentcode);
          })
          .map((accounts) => (
            <Card key={accounts.phonenumber}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3
                  className={`text-sm font-medium ${getColorForText(
                    accounts.agentcode
                  )}`}
                >
                  {accounts.phonenumber}
                </h3>
                <p
                  className={`text-sm font-bold ${getColorForText(
                    accounts.agentcode
                  )}`}
                >
                  {accounts.agentcode}
                </p>
              </CardHeader>
              <CardBody>
                {accounts.sub_accounts
                  .sort((a, b) => {
                    return a.devise.localeCompare(b.devise);
                  })
                  .map((subAccounts) => (
                    <div
                      className={'flex items-center justify-between'}
                      key={subAccounts.id}
                    >
                      <span>{subAccounts.devise}</span>
                      <p className="text-xl font-bold">
                        {subAccounts.amount.toLocaleString('en-US')}
                        <span className={'text-sm'}>
                          {`${subAccounts.devise === 'USD' ? ' $' : ' FC'}`}
                        </span>
                      </p>
                    </div>
                  ))}
              </CardBody>
            </Card>
          ))}
      </div>
    </section>
  );
}
