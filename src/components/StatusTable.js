'use client';

import { useState } from 'react';
import Image from 'next/image';
import gt from 'semver/functions/gt';
import coerce from 'semver/functions/coerce';
import valid from 'semver/functions/valid';
import MinecraftFormatted from './MinecraftFormatted';
import Chevron from './Chevron';
import UserIcon from '../assets/icons/user.svg';
import ListIcon from '../assets/icons/list.svg';
import internalMods from '../assets/internal-mods';

const hasDuplicateValues = (arr) => arr.length > new Set(arr).size;
const sortAscendingCaseInsensitive = (prop) => (a, b) => a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : b[prop].toLowerCase() > a[prop].toLowerCase() ? -1 : 0;

export default function StatusTable({ result, protocolVersions }) {
	const [showMods, setShowMods] = useState(false);
	const [showPlayers, setShowPlayers] = useState(false);
	const [showAvatars, setShowAvatars] = useState(false);

	const rows = [
		[
			'Status',
			result.online
				? <span className="bg-green-700 text-white px-2 py-1 rounded text-sm">Online</span>
				: <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">Offline</span>
		],
		[
			'Host',
			<span className="font-mono" key="host">{result.host}</span>
		],
		[
			'Port',
			<span className="font-mono" key="port">{result.port}</span>
		]
	];

	if (result.online) {
		const allowAvatars = !hasDuplicateValues(result.players?.list?.map((player) => player.uuid) ?? []);

		if (result.icon) {
			rows.push([
				'Icon',
				result.icon
					? <Image src={result.icon} width="64" height="64" alt="Server icon" />
					: <p className="text-neutral-500 dark:text-neutral-400">N/A</p>
			]);
		}

		rows.push(
			[
				'MOTD',
				<MinecraftFormatted html={result.motd.html} key="motd" />
			],
			[
				'Version',
				result.version?.name_raw || result.version?.name
					? result.version.name_raw === result.version.name_clean || result.version?.name
						? <span>{result.version.name_clean ?? result.version.name}</span>
						: <MinecraftFormatted html={result.version.name_html} />
					: <span className="text-neutral-500 dark:text-neutral-400">N/A (&lt; 1.3)</span>
			],
			[
				'Players',
				<>
					<div className="flex items-center gap-3">
						<span>{result.players.online} / {result.players.max}</span>
						{
							result.players.list?.length > 0
								? <>
									<span className="flex items-center gap-3">
										<button type="button" className="button w-auto text-sm" onClick={() => setShowPlayers(!showPlayers)} aria-controls="players-list" aria-expanded={showPlayers}>
											<div className="flex items-center gap-1">
												<span>{showPlayers ? 'Hide' : 'Show'} player list</span>
												<Chevron width="20" height="20" isFlipped={showPlayers} />
											</div>
										</button>
										{
											showPlayers && allowAvatars
												? <button type="button" className="button flex gap-2 items-center text-sm" onClick={() => setShowAvatars(!showAvatars)}>
													{
														showAvatars
															? <ListIcon width="20" height="20" />
															: <UserIcon width="20" height="20" />
													}
													{
														showAvatars
															? <span>List</span>
															: <span>Avatars</span>
													}
												</button>
												: null
										}
									</span>
								</>
								: null
						}
					</div>
					{
						result.players.list?.length > 0
							? <div className={showPlayers ? 'block' : 'hidden'} id="players-list">
								{
									showAvatars && allowAvatars
										? <ul className="list-none flex flex-wrap gap-3 mt-3">
											{
												result.players.list.sort(sortAscendingCaseInsensitive('name_clean')).map((player, index) => (
													<li key={index}>
														<div className="flex gap-3 items-center">
															<Image src={`https://api.mineatar.io/head/${player.uuid}`} width="32" height="32" />
															<span title={player.uuid}>{player.name_clean}</span>
														</div>
													</li>
												))
											}
										</ul>
										: allowAvatars
											? <ul className="font-mono whitespace-pre bg-black p-4 mt-3">
												{
													result.players.list.sort(sortAscendingCaseInsensitive('name_clean')).map((player, index) => (
														<li key={index}>
															<p className="text-white flex flex-col md:flex-row md:items-center md:justify-between md:gap-3">
																<span>
																	<span className="text-neutral-500">{Array((result.players.list.length.toString().length - (index + 1).toString().length) + 1).join(' ')}{index + 1}. </span>
																	<a href={`https://minecraftuuid.com/?search=${encodeURIComponent(player.uuid)}`} className="link">{player.name_clean}</a>
																</span>
																<span className="hidden sm:block text-neutral-500">
																	<span className="md:hidden">{Array(result.players.list.length.toString().length + 3).join(' ')}</span>
																	<span>{player.uuid}</span>
																</span>
															</p>
														</li>
													))
												}
											</ul>
											: <MinecraftFormatted html={result.players.list.map((player) => player.name_html).join('\n')} className="mt-3" />
								}
								{
									result.players.online > result.players.list.length && allowAvatars
										? <p className="text-neutral-500 dark:text-neutral-400 mt-3 italic">Note that not all online players are shown. Standard Java Edition servers limit sample players to 12 by default.</p>
										: null
								}
							</div>
							: null
					}
				</>
			]
		);

		if (typeof result.mods !== 'undefined') {
			rows.push([
				'Mods',
				<>
					{
						result.mods.length > 0
							? <span>{result.mods.length} mod{result.mods.length === 1 ? '' : 's'} loaded</span>
							: <span>No mods detected</span>
					}
					{
						result.mods.length > 0
							? <>
								<button type="button" className="button ml-3 w-auto text-sm" onClick={() => setShowMods(!showMods)} aria-controls="mods-list" aria-expanded={showMods}>
									<div className="flex items-center gap-1">
										<span>{showMods ? 'Hide' : 'Show'} mod list</span>
										<Chevron width="20" height="20" isFlipped={showMods} />
									</div>
								</button>
								<div className={`${showMods ? 'block' : 'hidden'} tags mt-2`} id="mods-list">
									<ul className="font-mono whitespace-pre bg-black p-4">
										{
											result.mods.sort(sortAscendingCaseInsensitive('name')).map((mod, index) => (
												<li key={index}>
													<p className="text-white">
														<span className="text-neutral-500">{Array((result.mods.length.toString().length - (index + 1).toString().length) + 1).join(' ')}{index + 1}. </span>
														{
															internalMods.includes(mod.name)
																? <span className="text-white">{mod.name}</span>
																: <a className="link" href={`https://www.curseforge.com/minecraft/mc-mods/search?search=${encodeURIComponent(mod.name)}`}>
																	<span>{mod.name}</span>
																</a>
														}
														{
															mod.version.length > 0 && valid(coerce(mod.version))
																? <span className="text-neutral-400"> v{mod.version}</span>
																: null
														}
													</p>
												</li>
											))
										}
									</ul>
								</div>
							</>
							: null
					}
				</>
			]);
		}

		if (typeof result.edition !== 'undefined') {
			rows.push([
				'Edition',
				result.edition
					? <span>{result.edition}</span>
					: <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
			]);
		}

		if (typeof result.gamemode !== 'undefined') {
			rows.push([
				'Gamemode',
				result.gamemode
					? <span>{result.gamemode}</span>
					: <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
			]);
		}

		let protocolVersion = null;

		if (result?.version?.protocol && protocolVersions) {
			protocolVersion = protocolVersions
				.filter((version) => !/^\d+w\d+\w$/.test(version.minecraftVersion) && ((typeof version.usesNetty === 'boolean' && version.usesNetty) || version.releaseType === 'release'))
				.sort((a, b) => gt(coerce(a.minecraftVersion), coerce(b.minecraftVersion)) ? 1 : -1)
				.find((version) => version.version === result.version.protocol);
		}

		rows.push(
			[
				'EULA Blocked',
				result.eula_blocked
					? <span className="text-red-600 dark:text-red-400">Yes</span>
					: <span>No</span>
			],
			[
				'Protocol Version',
				result.version?.protocol
					? <span>
						<span>{result.version.protocol}</span>
						{
							protocolVersion
								? <span className="text-neutral-500 dark:text-neutral-400"> ({protocolVersion.minecraftVersion}+)</span>
								: null
						}
					</span>
					: <span className="text-neutral-500 dark:text-neutral-400">N/A</span>
			]
		);
	}

	return (
		<div>
			{
				rows.map(([label, content], index) => (
					<div className={`block lg:flex w-full p-4 ${index + 1 !== rows.length ? 'border-b border-b-black/10 dark:border-b-white/10 contrast-more:border-b-black/50 contrast-more:dark:border-b-white/50' : ''}`} key={index}>
						<span className="block lg:inline-block mb-1 lg:mb-0 w-64 font-semibold self-center">{label}</span>
						<div className="w-full">
							{content}
						</div>
					</div>
				))
			}
		</div>
	);
}