'use client';
import React, { useRef, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Input,
  Textarea,
} from '@nextui-org/react';
import { DollarSignIcon, Loader2, PlusIcon, Save } from 'lucide-react';
import { SubAccount } from 'types';
import * as zod from 'zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ApprovisionnerProps {
  subAccountList: SubAccount[];
}

export const Approvisionner = ({ subAccountList }: ApprovisionnerProps) => {
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
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, getValues } = useForm<zod.infer<typeof schema>>({});
  const onSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch('/api/approvisionnement', {
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
      toast.success('The transaction was added successfully');
      closeElement();
    } else {
      toast.error('Error transaction');
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
        Approvisionner
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={'2xl'}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Approvisionner
              </ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit} ref={formRef}>
                  <div className={'flex gap-4'}>
                    <Select
                      label="Selectionnez un compte"
                      placeholder="Selectionnez un compte"
                      labelPlacement="outside"
                      className="max-w-xs"
                      isRequired
                      {...register('accountNumber')}
                      disableSelectorIconRotation
                    >
                      {subAccountList.map((subAccount) => (
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
                        <DollarSignIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                    />
                  </div>
                  <Textarea
                    label="Commentaires"
                    labelPlacement="outside"
                    placeholder="Entrez un commentaire"
                    {...register('commentaire')}
                    className="w-full"
                  />
                  <div className={'flex justify-end gap-4 py-4'}>
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
