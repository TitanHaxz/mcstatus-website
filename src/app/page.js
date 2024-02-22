import Image from 'next/image';
import Link from 'next/link';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import GiftIcon from '@/assets/icons/gift.svg';
import InfoIcon from '@/assets/icons/info.svg';
import ToolIcon from '@/assets/icons/tool.svg';
import mineatarIcon from '@/assets/img/mineatar.png';
import serverFlexIcon from '@/assets/img/serverflex.png';
import CarbonAd from '@/components/CarbonAd';
import SampleServers from '@/components/SampleServers';
import LookupForm from '@/components/layout/LookupForm';
import Navbar from '@/components/layout/Navbar';

export const revalidate = 30;

export default function Page() {
    return (
        <>
            <Navbar active="home" />
            <div className="container">
                <section>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                        <hgroup>
                            <h1 className="title">Minecraft Sunucu Durumu</h1>
                            <p className="subtitle">Herhangi bir Minecraft sunucusunun durumunu hızlı bir şekilde alın</p>
                        </hgroup>
                        <CarbonAd />
                    </div>
                    <LookupForm className="mt-5" autoFocus />
                </section>
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify([
                    {
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        'itemListElement': [
                            {
                                '@type': 'ListItem',
                                'position': 1,
                                'name': 'Home',
                                'item': 'https://mcstatus.io'
                            }
                        ]
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        'url': 'https://mcstatus.io',
                        'potentialAction': {
                            '@type': 'SearchAction',
                            'target': {
                                '@type': 'EntryPoint',
                                'urlTemplate': 'https://mcstatus.io/status/java/{host}'
                            },
                            'query-input': 'required name=host'
                        }
                    }
                ])
            }} />
        </>
    );
}