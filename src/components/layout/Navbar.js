'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ArrowRightIcon from '@/assets/icons/arrow-right.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import DiscordIcon from '@/assets/icons/discord.svg';
import GithubIcon from '@/assets/icons/github.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import CloseIcon from '@/assets/icons/x.svg';
import icon from '@/assets/img/icon.png';

export default function Navbar({ active }) {
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (showMenu) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [showMenu]);

    return (
        <nav className={`text-black dark:text-white w-screen h-[4.25rem] sticky top-0 z-50 ${!showMenu ? 'bg-white dark:bg-[#121212dd] bg-opacity-80 backdrop-blur-[6px] backdrop-saturate-150 backdrop-brightness-50 border-b border-b-neutral-200 dark:border-b-neutral-800' : ''}`}>
            <div className="container container-no-margin relative md:px-6 h-full flex items-center">
                <header className={`${showMenu ? 'hidden' : 'md:max-lg:hidden'} md:pr-6 md:border-r-2 md:border-r-[rgba(0,0,0,0.1)] md:dark:border-r-neutral-700 mr-6`}>
                    <Link href="/" className="flex items-center content-center p-1">
                        <Image src={icon} alt="mcstatus.io Icon" width="32" height="32" priority />
                        <span className="text-xl font-extrabold ml-2 tracking-tighter">MCF</span>
                    </Link>
                </header>
                <button className="absolute top-4 right-4 z-50 text-black dark:text-white ml-auto md:hidden p-2" type="button" onClick={() => setShowMenu(!showMenu)}>
                    {
                        showMenu
                            ? <CloseIcon width="24" height="24" className="text-white" />
                            : <MenuIcon width="24" height="24" />
                    }
                    <span className="sr-only">{showMenu ? 'Close Menu' : 'Open Menu'}</span>
                </button>
                <ul className={`list-none text-neutral-500 dark:text-neutral-400 ${showMenu ? 'flex flex-col justify-center absolute top-0 left-0 bg-neutral-900 bg-opacity-90 backdrop-blur-lg w-[100vw] h-[100vh] z-40' : 'hidden md:flex'} gap-4 items-center grow`}>
                    <li>
                        <Link href="/">
                            <div className={`p-1 ${showMenu && active === 'home' ? 'text-white' : active === 'home' ? 'text-black dark:text-white' : showMenu ? 'text-neutral-400' : 'hover:text-black hover:dark:text-white'}`}>
                                <span>Anasayfa</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/tools">
                            <div className={`p-1 ${showMenu && active === 'tools' ? 'text-white' : active === 'tools' ? 'text-black dark:text-white' : showMenu ? 'text-neutral-400' : 'hover:text-black hover:dark:text-white'}`}>
                                <span>Tools</span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs">
                            <div className={`p-1 ${showMenu && active === 'api' ? 'text-white' : active === 'api' ? 'text-black dark:text-white' : showMenu ? 'text-neutral-400' : 'hover:text-black hover:dark:text-white'}`}>
                                <span className="hidden md:block">API</span>
                                <span className="block md:hidden">API Documentation</span>
                            </div>
                        </Link>
                    </li>
                    <li className="md:mr-auto"></li>
                </ul>
            </div>
        </nav>
    );
}