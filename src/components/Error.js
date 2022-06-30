import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function Error({ statusCode, reason }) {
	return (
		<>
			<Head>
				<title>{statusCode} - mcstatus.io</title>
			</Head>
			<h1 className="title is-size-1 mb-4 pb-1">{statusCode}</h1>
			<p className="subtitle mt-0">{reason}</p>
			<Link href="/">
				<a className="button is-link">&larr; Return to Home</a>
			</Link>
		</>
	);
}

Error.propTypes = {
	statusCode: PropTypes.number.isRequired,
	reason: PropTypes.string.isRequired
};