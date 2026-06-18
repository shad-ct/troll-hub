import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import {
	audioFiles,
	type IntlKey,
	intlAudioFiles,
	intlDisplayNames,
	intlImages,
	intlEmojis,
} from "./constants/audio"

type Tab = "malayalam" | "international"

// F-key labels for display
const FKEY_LABELS: Partial<Record<string, string>> = {
	F1: "F1", F2: "F2", F3: "F3", F4: "F4",
	F5: "F5", F6: "F6", F7: "F7", F8: "F8",
	F9: "F9", F10: "F10", F11: "F11", F12: "F12",
}

function App() {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [query, setQuery] = useState("")
	const [playingKey, setPlayingKey] = useState<string | null>(null)
	const [activeTab, setActiveTab] = useState<Tab>("malayalam")
	const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

	// ── Audio playback ──────────────────────────────────────────────────────────
	const playAudio = useCallback((src: string, key: string) => {
		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.src = src
			audioRef.current
				.play()
				.then(() => setPlayingKey(key))
				.catch((error: unknown) =>
					console.error("Audio playback failed:", error)
				)
		}
	}, [])

	const stopAudio = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.currentTime = 0
			setPlayingKey(null)
		}
	}, [])

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return
		const handleEnded = () => setPlayingKey(null)
		audio.addEventListener("ended", handleEnded)
		return () => audio.removeEventListener("ended", handleEnded)
	}, [])

	// ── Malayalam list ──────────────────────────────────────────────────────────
	const malayalamList = useMemo(() =>
		Object.entries(audioFiles).map(([key, path]) => ({
			key,
			name: (path.split("/").pop() || "").replace(/\.mp3$/i, ""),
			src: path,
		})),
		[])

	const filteredMalayalam = useMemo(() => {
		if (!query.trim()) return malayalamList
		const q = query.toLowerCase()
		return malayalamList.filter(
			({ key, name }) =>
				key.toLowerCase().includes(q) || name.toLowerCase().includes(q)
		)
	}, [malayalamList, query])

	// ── International list ──────────────────────────────────────────────────────
	const intlList = useMemo(() =>
		(Object.keys(intlAudioFiles) as IntlKey[]).map((key) => ({
			key,
			name: intlDisplayNames[key],
			src: intlAudioFiles[key],
			image: intlImages[key],
			emoji: intlEmojis[key],
		})),
		[])

	const filteredIntl = useMemo(() => {
		if (!query.trim()) return intlList
		const q = query.toLowerCase()
		return intlList.filter(
			({ key, name }) =>
				key.toLowerCase().includes(q) || name.toLowerCase().includes(q)
		)
	}, [intlList, query])

	// ── Keyboard shortcuts ──────────────────────────────────────────────────────
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const active = document.activeElement
			if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA"))
				return

			if (event.code === "Space") {
				event.preventDefault()
				stopAudio()
				return
			}

			if (activeTab === "malayalam") {
				const key = event.key.toLowerCase()
				const match = filteredMalayalam.find((item) => item.key === key)
				if (match) playAudio(match.src, match.key)
			} else {
				// F1–F12 function keys
				if (event.key.match(/^F\d{1,2}$/) && !event.shiftKey && !event.ctrlKey && !event.altKey) {
					event.preventDefault()
					const match = filteredIntl.find((item) => item.key === event.key)
					if (match) playAudio(match.src, match.key)
					return
				}
				// 0-9, a-z, and numpad operators: / * - + .
				const plainKey = event.key.toLowerCase()
				if (
					(/^[0-9a-z]$/.test(plainKey) || ["/", "*", "-", "+", "."].includes(event.key)) &&
					!event.ctrlKey && !event.altKey && !event.metaKey
				) {
					const lookupKey = /^[a-z]$/.test(plainKey) ? plainKey : event.key
					const match = filteredIntl.find((item) => item.key === lookupKey)
					if (match) playAudio(match.src, match.key)
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [activeTab, filteredMalayalam, filteredIntl, playAudio, stopAudio])

	// Clear search when switching tabs
	const handleTabChange = (tab: Tab) => {
		setActiveTab(tab)
		setQuery("")
		stopAudio()
	}

	const totalShown = activeTab === "malayalam" ? filteredMalayalam.length : filteredIntl.length
	const totalAll = activeTab === "malayalam" ? malayalamList.length : intlList.length

	return (
		<div style={{ height: "100dvh" }} className="bg-gray-950 text-white flex flex-col overflow-hidden">
			{/* Header */}
			<header className="shrink-0 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800 px-3 py-2">
				<div className="flex items-center gap-2">
					<h1 className="text-base font-extrabold text-red-500 tracking-tight shrink-0">
						🎭 Troll Hub
					</h1>

					{/* Tab switcher */}
					<div className="flex shrink-0 rounded-md overflow-hidden border border-gray-700 text-xs font-semibold">
						<button
							onClick={() => handleTabChange("malayalam")}
							className={`px-3 py-1 transition-colors ${activeTab === "malayalam"
								? "bg-red-600 text-white"
								: "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
								}`}
						>
							🇮🇳 Malayalam
						</button>
						<button
							onClick={() => handleTabChange("international")}
							className={`px-3 py-1 border-l border-gray-700 transition-colors ${activeTab === "international"
								? "bg-blue-600 text-white"
								: "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
								}`}
						>
							🌍 International
						</button>
					</div>

					{/* Search */}
					<div className="relative flex-1">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search sounds..."
							className="w-full pl-8 pr-8 py-1 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700 text-xs"
						/>
						{query && (
							<button
								onClick={() => setQuery("")}
								className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-base leading-none"
								aria-label="Clear search"
							>
								×
							</button>
						)}
					</div>

					<span className="text-xs text-gray-500 shrink-0">
						{totalShown} / {totalAll}
					</span>
				</div>
			</header>

			{/* ── Malayalam Tab ─────────────────────────────────────────────────────── */}
			{activeTab === "malayalam" && (
				<main className="flex-1 overflow-hidden p-2" style={{ minHeight: 0 }}>
					{filteredMalayalam.length === 0 ? (
						<EmptyState query={query} onClear={() => setQuery("")} />
					) : (
						<div
							className="h-full"
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(5, 1fr)",
								gridTemplateRows: "repeat(7, 1fr)",
								gap: "6px",
							}}
						>
							{filteredMalayalam.map(({ key, name, src }) => {
								const isPlaying = playingKey === key
								return (
									<button
										key={key}
										onClick={() => playAudio(src, key)}
										className={`
											group flex flex-row rounded-lg overflow-hidden cursor-pointer
											border transition-all duration-150 text-left w-full h-full
											${isPlaying
												? "border-red-500 ring-2 ring-red-500/40 shadow-lg shadow-red-500/20"
												: "border-gray-800 hover:border-red-500/60"
											}
											bg-gray-900
										`}
									>
										<div className="relative h-full aspect-square shrink-0 overflow-hidden">
											<img
												src={`/images/${key}.webp`}
												alt={name}
												className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
											{isPlaying ? (
												<div className="absolute inset-0 bg-red-500/30 flex items-center justify-center">
													<span className="text-xl animate-pulse drop-shadow-lg">🔊</span>
												</div>
											) : (
												<div className="absolute inset-0 flex items-center justify-center">
													<span className="bg-white/20 backdrop-blur-sm text-white text-sm font-extrabold w-8 h-8 flex items-center justify-center rounded-full uppercase">
														{key}
													</span>
												</div>
											)}
										</div>
										<div className={`
											flex-1 flex items-center px-3 min-w-0 transition-colors
											${isPlaying ? "bg-red-600" : "bg-gray-900 group-hover:bg-red-600/20"}
										`}>
											<p className={`text-sm font-semibold leading-snug line-clamp-2 ${isPlaying ? "text-white" : "text-gray-200"}`}>
												{name}
											</p>
										</div>
									</button>
								)
							})}
						</div>
					)}
				</main>
			)}

			{/* ── International Tab ─────────────────────────────────────────────────── */}
			{activeTab === "international" && (
				<main className="flex-1 overflow-y-auto p-2" style={{ minHeight: 0 }}>
					{/* Keyboard hint */}
					<div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
						<span>⌨️ 0–9 and A–Z keys · F1–F12 · numpad / * - + . · Space to stop</span>
					</div>

					{filteredIntl.length === 0 ? (
						<EmptyState query={query} onClear={() => setQuery("")} />
					) : (
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
								gap: "8px",
							}}
						>
							{filteredIntl.map(({ key, name, src, image, emoji }) => {
								const isPlaying = playingKey === key
								const imgFailed = imgErrors[key]
								const keyLabel = FKEY_LABELS[key] ?? key

								return (
									<button
										key={key}
										onClick={() => playAudio(src, key)}
										className={`
											group flex flex-col rounded-xl overflow-hidden cursor-pointer
											border transition-all duration-150 text-left w-full
											${isPlaying
												? "border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/20"
												: "border-gray-800 hover:border-blue-500/60"
											}
											bg-gray-900
										`}
									>
										{/* Image area */}
										<div className="relative w-full aspect-square overflow-hidden bg-gray-800">
											{!imgFailed ? (
												<img
													src={image}
													alt={name}
													crossOrigin="anonymous"
													referrerPolicy="no-referrer"
													onError={() =>
														setImgErrors((prev) => ({ ...prev, [key]: true }))
													}
													className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center text-5xl">
													{emoji}
												</div>
											)}

											{/* Playing overlay */}
											{isPlaying && (
												<div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
													<span className="text-3xl animate-pulse drop-shadow-lg">🔊</span>
												</div>
											)}

											{/* Key badge */}
											{!isPlaying && (
												<div className="absolute top-1 right-1">
													<span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-1.5 py-0.5 rounded font-mono">
														{keyLabel}
													</span>
												</div>
											)}
										</div>

										{/* Name bar */}
										<div className={`
											px-2 py-1.5 transition-colors
											${isPlaying ? "bg-blue-600" : "bg-gray-900 group-hover:bg-blue-600/20"}
										`}>
											<p className={`text-xs font-semibold leading-snug line-clamp-2 ${isPlaying ? "text-white" : "text-gray-200"}`}>
												{name}
											</p>
										</div>
									</button>
								)
							})}
						</div>
					)}
				</main>
			)}

			<audio ref={audioRef} />
		</div>
	)
}

function EmptyState({ query, onClear }: { query: string; onClear: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center h-full text-gray-500">
			<span className="text-4xl mb-3">🔇</span>
			<p>No sounds found for "<span className="text-white">{query}</span>"</p>
			<button onClick={onClear} className="mt-3 text-sm text-red-400 hover:text-red-300 underline">
				Clear search
			</button>
		</div>
	)
}

export default App
