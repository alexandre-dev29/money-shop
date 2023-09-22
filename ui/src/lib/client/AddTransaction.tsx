'use client';
import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Input,
  Textarea,
} from '@nextui-org/react';
import {
  DollarSignIcon,
  Loader2,
  PhoneIcon,
  PlusIcon,
  Save,
  User2Icon,
} from 'lucide-react';
import { SubAccount } from 'types';
import toast from 'react-hot-toast';
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import { useTransactionListState } from 'states';
import { getAllTransactionPured } from 'utils';

export const AddTransaction = () => {
  const { subAccounts, setListOfTransaction, setAccountsList } =
    useTransactionListState();

  const {
    isOpen,
    onOpen,
    onOpenChange,
    onClose: closeElement,
  } = useDisclosure();
  const schema = zod.object({
    accountNumber: zod.string(),
    montant: zod.number(),
    commentaire: zod.string().optional(),
    phoneNumber: zod.string().min(6),
    clientName: zod.string().min(1),
    identityPiece: zod.string().min(1),
    transactionNumber: zod.string().min(1),
    transactionType: zod.string().min(1),
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, getValues } = useForm<zod.infer<typeof schema>>({});

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch('/api/transactions', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getValues()),
    });

    const finalResponse = await response.json();
    if (finalResponse.messageType === 'success') {
      formRef?.current?.reset();
      toast.success('The transaction was added successfully', {
        position: 'top-right',
      });
      setListOfTransaction(getAllTransactionPured(finalResponse.transactions));
      setAccountsList(finalResponse.accountList);
      closeElement();
    } else {
      toast.error('Error transaction', { position: 'top-right' });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button
        className="bg-foreground text-background"
        startContent={<PlusIcon />}
        size="sm"
        onPress={onOpen}
      >
        Transaction
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={'3xl'}
        className={''}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Nouvelle transaction
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={onSubmit}
                  ref={formRef}
                  className={'grid grid-cols-2 gap-x-8 gap-y-4'}
                >
                  <Select
                    label="Selectionnez un compte"
                    placeholder="Selectionnez un compte"
                    labelPlacement="outside"
                    className=""
                    isRequired
                    {...register('accountNumber')}
                    disableSelectorIconRotation
                  >
                    {subAccounts.map((subAccount) => (
                      <SelectItem key={subAccount.id} value={subAccount.id}>
                        {subAccount.type}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Type D'operation"
                    placeholder="Type D'operation"
                    labelPlacement="outside"
                    className=""
                    isRequired
                    {...register('transactionType')}
                    disableSelectorIconRotation
                  >
                    {[
                      { id: 'Depot', type: 'Depot' },
                      { id: 'Retrait', type: 'Retrait' },
                    ].map((subAccount) => (
                      <SelectItem key={subAccount.id} value={subAccount.id}>
                        {subAccount.type}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    type="number"
                    label="Montant"
                    placeholder="ex: 2500"
                    labelPlacement="outside"
                    isRequired
                    {...register('montant')}
                    startContent={
                      <DollarSignIcon className="text-2xl text-default-400 pointer-events-none " />
                    }
                  />
                  <Input
                    type="text"
                    label="Numero de telephone"
                    placeholder="ex: +243975344..."
                    labelPlacement="outside"
                    isRequired
                    {...register('phoneNumber')}
                    startContent={
                      <PhoneIcon className="text-2xl text-default-400 pointer-events-none " />
                    }
                  />
                  <Input
                    type="text"
                    label="Nom du client"
                    placeholder="ex: Alexandre"
                    labelPlacement="outside"
                    isRequired
                    {...register('clientName')}
                    startContent={
                      <User2Icon className="text-2xl text-default-400 pointer-events-none " />
                    }
                  />
                  <Input
                    type="text"
                    label="Numero piece d'identite"
                    placeholder="ex: 245223544"
                    labelPlacement="outside"
                    isRequired
                    {...register('identityPiece')}
                  />
                  <Input
                    type="text"
                    label="Numero de transaction"
                    placeholder="ex: 245223544"
                    labelPlacement="outside"
                    isRequired
                    {...register('transactionNumber')}
                  />

                  <Textarea
                    label="Commentaires"
                    labelPlacement="outside"
                    placeholder="Entrez un commentaire"
                    {...register('commentaire')}
                    className="w-full col-span-2"
                  />
                  <div
                    className={
                      'justify-self-end col-span-2 gap-8 py-4 items-center'
                    }
                  >
                    <Button color="danger" variant="light" onPress={onClose}>
                      Annuler
                    </Button>
                    <Button
                      color="default"
                      disabled={isLoading}
                      className={'bg-gray-800 text-white'}
                      type={'submit'}
                    >
                      {!isLoading ? (
                        <>
                          <Save />
                          Approvisionner
                        </>
                      ) : (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
