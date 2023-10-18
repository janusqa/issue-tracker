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
import { Container } from '@radix-ui/themes';

const NavBar = () => {
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues/index' },
    ];

    const currentPath = usePathname();

    const { status, data: session } = useSession();

    return (
        <nav className="border-b mb-5 px-5 py-3 ">
            <Container>
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <AiFillBug />
                        </Link>
                        <ul className="flex space-x-6">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        className={classNames({
                                            'text-zinc-900':
                                                currentPath === link.href,
                                            'text-zinc-500':
                                                currentPath !== link.href,
                                            'hover:text-zinc-800 transition-colors':
                                                true,
                                        })}
                                        href={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        {status === 'authenticated' && (
                            <Link href="/api/auth/signout">Logout</Link>
                        )}{' '}
                        {status === 'unauthenticated' && (
                            <Link href="/api/auth/signin">Login</Link>
                        )}
                    </div>
                </div>
            </Container>
        </nav>
    );
};

export default NavBar;
