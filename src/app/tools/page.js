import Link from 'next/link';
import ExternalLinkIcon from '@/assets/icons/external-link.svg';
import CarbonAd from '@/components/CarbonAd';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
    title: 'Tools',
    description: 'A few simple and easy to use tools for Minecraft server owners and developers. All of our tools are free to use forever.',
    openGraph: {
        title: 'Tools - Minecraft Server Status',
        description: 'A few simple and easy to use tools for Minecraft server owners and developers. All of our tools are free to use forever.',
        url: '/tools',
        siteName: 'Minecraft Server Status',
        images: [
            {
                url: '/img/icon.png',
                width: 300,
                height: 300
            }
        ],
        locale: 'en-US',
        type: 'website'
    },
    alternates: {
        canonical: '/tools'
    }
};

export default function Page() {
    return (
        <>
            <Navbar active="tools" />
            <div className="container">
                <section>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
                        <hgroup>
                            <h1 className="title">Araçlar</h1>
                            <p className="subtitle">Size yardımcı olacak basit sunucu yönetimi araçları</p>
                        </hgroup>
                        <CarbonAd />
                    </div>
                </section>
                <section className="pt-12">
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" >
                        <li>
                            <Link href="/">
                                <div className="card card-hover h-full" style={{ background: "#1d2333" }}>
                                    <p className="text-lg font-bold">Sunucu Durumu Denetleyicisi</p>
                                    <p className="mt-1">Herhangi bir Java veya Bedrock Edition Minecraft sunucusunun durumunu kolayca kontrol edin.</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/tools/motd">
                                <div className="card card-hover h-full" style={{ background: "#1d2333" }}>
                                    <p className="text-lg font-bold">MOTD Düzenleyici</p>
                                    <p className="mt-1">Bir MOTD'yi kendi sunucunuzda kullanmadan önce kolayca düzenleyin ve önizleyin.</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/tools/vote">
                                <div className="card card-hover h-full" style={{ background: "#1d2333" }}>
                                    <p className="text-lg font-bold">Votifier Testi</p>
                                    <p className="mt-1">Gerçek bir oy göndererek Oylayıcınızın düzgün şekilde ayarlanıp ayarlanmadığını hızlı bir şekilde test edin.</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <a href="https://mctools.org/whitelist-creator?utm_source=mcstatus.io" rel="sponsored">
                                <div className="card card-hover h-full" style={{ background: "#1d2333" }}>
                                    <p className="flex items-center gap-3 text-lg font-bold">
                                        <span>Whitelist Oluşturucu</span>
                                        <ExternalLinkIcon width="16" height="16" className="text-neutral-500" />
                                    </p>
                                    <p className="mt-1">Önceden doldurulmuş oynatıcı UUID'leriyle otomatik olarak bir whitelist oluşturur.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://mctools.org/server-properties-creator?utm_source=mcstatus.io" rel="sponsored">
                                <div className="card card-hover h-full" style={{ background: "#1d2333" }}>
                                    <p className="flex items-center gap-3 text-lg font-bold">
                                        <span>Sunucu Özellikleri Düzenleyicisi</span>
                                        <ExternalLinkIcon width="16" height="16" className="text-neutral-500" />
                                    </p>
                                    <p className="mt-1">Çevrimiçi düzenleyicimizi kullanarak server.properties dosyanızı hızla ayarlayın.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.planetminecraft.com/banner?utm_source=mcstatus.io" rel="sponsored">
                                <div className="card card-hover h-full" style={{ background: "#1d2333" }}>
                                    <p className="flex items-center gap-3 text-lg font-bold">
                                        <span>Banner Düzenleyici</span>
                                        <ExternalLinkIcon width="16" height="16" className="text-neutral-500" />
                                    </p>
                                    <p className="mt-1">Çevrimiçi bir görsel düzenleyiciyi kullanarak herhangi bir banner tasarımını kolayca oluşturun.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://minecraft-ids.grahamedgecombe.com?utm_source=mcstatus.io" rel="sponsored">
                                <div className="card card-hover h-full" style={{ background: "#1d2333" }}>
                                    <p className="flex items-center gap-3 text-lg font-bold">
                                        <span>Blok &amp; İtem</span>
                                        <ExternalLinkIcon width="16" height="16" className="text-neutral-500" />
                                    </p>
                                    <p className="mt-1">Minecraft'taki tüm mevcut blokların ve öğelerin tam listesi.</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="https://haselkern.com/Minecraft-ArmorStand" rel="sponsored">
                                <div className="card card-hover h-full" style={{ background: "#1d2333" }}>
                                    <p className="flex items-center gap-3 text-lg font-bold">
                                        <span>Zırh Standı Yaratıcısı</span>
                                        <ExternalLinkIcon width="16" height="16" className="text-neutral-500" />
                                    </p>
                                    <p className="mt-1">Zırh standının herhangi bir varyasyonunu ortaya çıkarmak için çağırma komutu oluşturmaya yönelik kolay bir araç.</p>
                                </div>
                            </a>
                        </li>
                    </ul>
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
                            },
                            {
                                '@type': 'ListItem',
                                'position': 2,
                                'name': 'Tools',
                                'item': 'https://mcstatus.io/tools'
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