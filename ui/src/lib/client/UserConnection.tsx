'use client';
import { useSession, signOut } from 'next-auth/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Tooltip,
} from '@nextui-org/react';

import Link from 'next/link';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LogIn } from 'lucide-react';

export const UserConnection = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <Avatar
            isBordered
            color={'warning'}
            as="button"
            className="transition-transform"
            name={`${session?.user?.name}`}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue={'Axel Mwenze'}
          >
            <p className="font-semibold text-center">Signed in as</p>
            <p className="font-semibold text-center">{session?.user?.name}</p>
          </DropdownItem>
          <DropdownItem key="help_and_feedback" textValue={'Help & Feedback'}>
            Help & Feedback
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={() => signOut({ callbackUrl: '/login' })}
            textValue={'Logout'}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  } else {
    return (
      <Tooltip content="Login to the application">
        <Link href={'/login'}>
          <LogIn className={'h-5 w-5'} />
        </Link>
      </Tooltip>
    );
  }
};
