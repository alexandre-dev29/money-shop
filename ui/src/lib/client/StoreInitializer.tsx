'use client';
import { Accounts, SubAccount, Transaction } from 'types';

import { useRef } from 'react';
import { useTransactionListState } from 'states';

export function StoreInitializer({
  transactions,
  subAccounts,
  accountsList,
}: {
  transactions: Transaction[];
  subAccounts: SubAccount[];
  accountsList: Accounts[];
}) {
  const initialized = useRef<boolean>(false);
  if (!initialized.current) {
    useTransactionListState.setState({
      listOfTransactions: transactions,
      subAccounts,
      accountsList: accountsList,
    });
    initialized.current = true;
  }
  return null;
}
