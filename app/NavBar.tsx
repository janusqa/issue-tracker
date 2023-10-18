'use client';
/**
 * This is a client component because we are using
 * usePathname() in this component. This uses browser APIs
 * which only are accessible on client side
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import { Avatar, Container, DropdownMenu, Text } from '@radix-ui/themes';
import Skeleton from './components/Skeleton';

const NavBar = () => {
    return (
        <nav className="border-b mb-5 px-5 py-3 ">
            <Container>
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <AiFillBug />
                        </Link>
                        <NavMenu />
                    </div>
                    <div>
                        <AuthMenu />
                    </div>
                </div>
            </Container>
        </nav>
    );
};

export default NavBar;

const NavMenu = () => {
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/index' },
    ];

    const currentPath = usePathname();

    return (
        <ul className="flex space-x-6">
            {links.map((link) => (
                <li key={link.label}>
                    <Link
                        className={classNames({
                            'nav-link': true,
                            '!text-zinc-900': currentPath === link.href,
                        })}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const AuthMenu = () => {
    const { status, data: session } = useSession();

    if (status === 'loading') return <Skeleton width="3rem" />;

    if (status === 'unauthenticated')
        return (
            <Link className="nav-link" href="/api/auth/signin">
                Login
            </Link>
        );

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar
                    size="2"
                    radius="full"
                    src={session!.user!.image!}
                    fallback="?"
                    className="cursor-pointer"
                />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Label>
                    <Text size="2">{session!.user?.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};
