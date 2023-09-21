import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { siteConfig } from 'config';
import { ThemeToggle } from '../client/theme-toggle';
import { UserConnection } from '../client/UserConnection';
import { getServerSession } from 'next-auth';
import { userSession } from 'types';
import { getUserFromSession } from 'utils';

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export async function NavBarComponent() {
  const session = await getServerSession();
  const informations = getUserFromSession(session);
  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'Log Out',
  ];

  return (
    <Navbar isBordered maxWidth={'2xl'}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarBrand>
          <AcmeLogo />
        </NavbarBrand>
        {siteConfig.mainNav.map((item) => {
          return item.needsAdminRights ? (
            informations?.role === 'Admin' ? (
              <Link key={Math.random()} href={item.href} color={'foreground'}>
                {item.title}
              </Link>
            ) : (
              ''
            )
          ) : (
            <Link key={Math.random()} href={item.href} color={'foreground'}>
              {item.title}
            </Link>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <ThemeToggle />
        </NavbarItem>
        <UserConnection />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? 'warning'
                  : index === menuItems.length - 1
                  ? 'danger'
                  : 'foreground'
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
