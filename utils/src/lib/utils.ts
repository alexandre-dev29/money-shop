import { Session } from 'next-auth';
import { Transaction, userSession } from 'types';

export function getUserFromSession(
  session: Session | null
): userSession | null {
  const user = session?.user;
  return user ? JSON.parse(`${user?.image}`) : null;
}
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getColorForText = (currentAccountName: string) => {
  switch (currentAccountName.toLowerCase()) {
    case 'main':
      return 'font-extrabold text-blue-500';
    case 'airtel':
      return 'font-extrabold text-red-500';
    case 'vodacom':
      return 'font-extrabold text-danger';
    case 'africell':
      return 'font-extrabold text-secondary';
    case 'orange':
      return 'font-extrabold text-warning';

    default:
      return '';
  }
};

export function getAllTransactionPured(transactionListData: any) {
  return transactionListData.map(
    (value: any) =>
      ({
        id: value.id,
        client: value.user.fullName,
        phone_number: value.phoneNumber,
        transaction_type: value.transationType,
        amount_before: value.amountBefore.toLocaleString('en-US'),
        amount: value.amount.toLocaleString('en-US'),
        devise: value.subAccount.devise.toString(),
        account: value.subAccount.type,
        piece_identite: value.numeroReference,
        numero_reference: value.numeroReference,
        date_transaction: new Date(value.createAt).toLocaleString('fr-Fr'),
      } as Transaction)
  );
}
