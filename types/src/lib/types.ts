import { ChipProps } from '@nextui-org/react';

export function types(): string {
  return 'types';
}

export type userSession = {
  id: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  accountNumber: string;
  shopId: string;
};

export const statusColorMap: Record<string, ChipProps['color']> = {
  Depot: 'success',
  Retrait: 'danger',
  Approvisionement: 'primary',
};

export interface Transaction {
  id: string;
  client: string;
  phone_number: string;
  transaction_type: string;
  piece_identite: string;
  numero_reference: string;
  amount_before: number;
  amount: number;
  devise: string;
  account: string;
  date_transaction: string;
}

export interface SubAccount {
  devise: 'CDF' | 'USD';
  id: string;
  accountNumber: string;
  amount: number;
  type: string;
  transationGenre:
    | 'Equity'
    | 'Airtel'
    | 'Vodacom'
    | 'Africell'
    | 'Orange'
    | 'MainAccount';
}
