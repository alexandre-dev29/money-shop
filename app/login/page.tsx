import React from 'react';
import { LoginForm } from './login-form';
import { getCsrfToken } from 'next-auth/react';

const Page = async () => {
  const csrfToken = await getCsrfToken();
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <LoginForm csrfToken={csrfToken} />
    </div>
  );
};

export default Page;
