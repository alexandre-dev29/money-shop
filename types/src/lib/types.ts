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
