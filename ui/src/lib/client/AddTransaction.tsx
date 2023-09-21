'use client';
import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';
import { SubAccount } from 'types';

interface AddTransactionProps {
  subAccountList: SubAccount[];
}

export const AddTransaction = ({ subAccountList }: AddTransactionProps) => {
  return (
    <Button
      className="bg-foreground text-background"
      startContent={<PlusIcon />}
      size="sm"
    >
      Transaction
    </Button>
  );
};
