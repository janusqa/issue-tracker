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

const NavBar = () => {
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ];

    const currentPath = usePathname();

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/">
                <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link
                            className={classNames({
                                'text-zinc-900': currentPath === link.href,
                                'text-zinc-500': currentPath !== link.href,
                                'hover:text-zinc-800 transition-colors': true,
                            })}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;