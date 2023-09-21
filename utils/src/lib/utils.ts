import { Session } from 'next-auth';
import { userSession } from 'types';

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
