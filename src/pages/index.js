import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Search from '../components/Search';
import { exampleServers } from '../assets/servers';

export default function Home({ servers }) {
	const { pathname } = useRouter();

	return (
		<>
			<Head>
				<title>Minecraft Server Status - mcstatus.io</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="Minecraft Server Status" />
				<meta name="description" content="Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io${pathname}`} />
				<meta property="og:title" content="Minecraft Server Status" />
				<meta property="og:description" content="Easily and quickly retrieve the status of any Java or Bedrock Edition Minecraft server by using our tool." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href="https://mcstatus.io" />
			</Head>
			<h1 className="title">Minecraft Server Status</h1>
			<Search />
			<h2 className="title is-4 mb-3 mt-5">Example Servers</h2>
			<div className="columns is-multiline">
				{
					servers.map((server, index) => (
						<div className="column is-6" key={index}>
							<Link href={`/status/${server.type}/${server.address}`}>
								<a className="box">
									<span className={`tag is-${server.type === 'java' ? 'success' : 'info'} is-pulled-right`}>{server.type === 'java' ? 'Java' : 'Bedrock'}</span>
									<p>
										<span>{server.name}</span>
										<span className="has-text-grey"> ({server.address})</span>
									</p>
								</a>
							</Link>
						</div>
					))
				}
			</div>
			<Script id="structured-data-1" type="application/ld+json">
				{`
					{
						"@context": "https://schema.org",
						"@type": "BreadcrumbList",
						"itemListElement": [
							{
								"@type": "ListItem",
								"position": 1,
								"name": "Home",
								"item": "https://mcstatus.io"
							}
						]
					}
				`}
			</Script>
			<Script id="structured-data-2" type="application/ld+json">
				{`
					{
						"@context": "https://schema.org",
						"@type": "WebSite",
						"url": "https://mcstatus.io/",
						"potentialAction": {
							"@type": "SearchAction",
							"target": {
								"@type": "EntryPoint",
								"urlTemplate": "https://mcstatus.io/status/{search_term_string}"
							},
							"query-input": "required name=search_term_string"
						}
					}
				`}
			</Script>
		</>
	);
}

Home.propTypes = {
	servers: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export function getServerSideProps() {
	const javaServers = exampleServers.filter((server) => server.type === 'java').sort(() => Math.random() - 0.5).slice(0, 4);
	const bedrockServers = exampleServers.filter((server) => server.type === 'bedrock').sort(() => Math.random() - 0.5).slice(0, 4);

	const servers = [];

	for (let i = 0; i < 4; i++) {
		servers.push(javaServers[i], bedrockServers[i]);
	}

	return { props: { servers } };
}