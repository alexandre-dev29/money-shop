import { Accounts, SubAccount, Transaction } from 'types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
interface ITransactionsListState {
  listOfTransactions: Transaction[];
  subAccounts: SubAccount[];
  accountsList: Accounts[];
  setListOfTransaction: (listTransaction: Transaction[]) => void;
  setAccountsList: (accountsList: Accounts[]) => void;
}

export const useTransactionListState = create<ITransactionsListState>()(
  devtools(
    persist(
      (setState) => ({
        listOfTransactions: [],
        subAccounts: [],
        accountsList: [],
        setListOfTransaction: (listTransaction: Transaction[]) => {
          setState(() => ({
            listOfTransactions: listTransaction,
          }));
        },
        setAccountsList: (accountsList: Accounts[]) => {
          setState(() => ({
            accountsList: accountsList,
          }));
        },
      }),
      { name: 'appTransactionList' }
    )
  )
);
