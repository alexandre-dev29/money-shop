'use client';
import { Card, CardBody, Input, Button, CardHeader } from '@nextui-org/react';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useForm } from 'react-hook-form';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LockIcon, LogInIcon, PhoneIcon } from 'lucide-react';
import * as zod from 'zod';
import { signIn } from 'next-auth/react';
// eslint-disable-next-line @nx/enforce-module-boundaries

export const LoginForm = ({ csrfToken }: { csrfToken: string | undefined }) => {
  const schema = zod.object({
    phoneNumber: zod
      .string()
      .min(8, { message: 'The phone number must have at least 9 digit' }),
    password: zod
      .string()
      .min(6, { message: 'The password must have at least 8 digit' }),
  });
  const { register, getValues } = useForm<zod.infer<typeof schema>>({});
  const onSubmit = (event: any) => {
    event.preventDefault();
    const currentValues = getValues();
    signIn('credentials', {
      phoneNumber: currentValues.phoneNumber,
      password: currentValues.password,
      callbackUrl: '/',
    }).then((value) => console.log(value));
  };
  return (
    <form onSubmit={onSubmit}>
      <Card className={'w-[90vw] md:w-[30vw]'}>
        <CardHeader className="p-6 space-y-1">
          <input name={'csrfToken'} type={'hidden'} defaultValue={csrfToken} />
          <div>
            <h2 className={'font-bold text-2xl'}>Login</h2>
            <p className={'font-light'}>
              Enter your phone number and password below to login
            </p>
          </div>
        </CardHeader>
        <CardBody className={'space-y-10'}>
          <Input
            autoFocus
            required
            isRequired
            {...register('phoneNumber')}
            endContent={
              <PhoneIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Phone Number"
            placeholder="Enter your phone Number"
            variant="bordered"
          />

          <Input
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            {...register('password')}
            label="Password"
            required
            isRequired
            placeholder="Enter your password"
            type="password"
            variant="bordered"
          />
          <Button color="success" startContent={<LogInIcon />} type={'submit'}>
            Login
          </Button>
        </CardBody>
      </Card>
    </form>
  );
};
