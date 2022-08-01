import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import Highlight from 'react-highlight';
import Error from '../../components/Error';
import javaExampleV1 from '../../assets/response/v1/java.jsonc';
import javaExampleV2 from '../../assets/response/v2/java.jsonc';
import bedrockExampleV1 from '../../assets/response/v1/bedrock.jsonc';
import sampleIcon from '../../assets/response/icon.png';
import Ad from '../../components/Ad';

export const revisions = [
	{
		id: 'v1',
		name: 'v1',
		content: (
			<>

			</>
		)
	},
	{
		id: 'v2',
		name: 'v2',
		content: (
			<>

			</>
		)
	}
];

export default function API() {
	const { push, query } = useRouter();

	const handleChange = (event) => {
		push(`/docs/${event.target.options[event.target.selectedIndex].value}`);
	};

	const revision = revisions.find((revision) => revision.id === query.version);

	if (!revision) return (
		<Error statusCode={404} reason="Page not found" />
	);

	return (
		<>
			<Head>
				<title>API Documentation - mcstatus.io</title>
				<meta name="robots" content="index,follow" />
				<meta name="title" content="API Documentation - mcstatus.io" />
				<meta name="description" content="Detailed documentation about our API and how to fetch the status of any Minecraft server through your service." />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={`https://mcstatus.io/docs/${revision.id}`} />
				<meta property="og:title" content="API Documentation - mcstatus.io" />
				<meta property="og:description" content="Detailed documentation about our API and how to fetch the status of any Minecraft server through your service." />
				<meta property="og:image" content="https://mcstatus.io/img/icon.png" />
				<link rel="canonical" href={`https://mcstatus.io/docs/${revision.id}`} />
			</Head>
			<div className="container content content-container">
				<Ad />
				<h1 className="title mt-0">API Documentation</h1>
				<label className="label" htmlFor="revision">API Revision</label>
				<div className="select">
					<select onChange={handleChange} id="revision">
						{
							revisions.map((meta, index) => (
								<option value={meta.id} key={index} selected={revision.id === meta.id}>{meta.name}</option>
							))
						}
					</select>
				</div>
				{revision.content}
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
							},
							{
								"@type": "ListItem",
								"position": 2,
								"name": "API",
								"item": "https://mcstatus.io/docs"
							},
							{
								"@type": "ListItem",
								"position": 3,
								"name": "${revision.name}",
								"item": "https://mcstatus.io/docs/${revision.id}"
							}
						]
					}
				`}
			</Script>
		</>
	);
}