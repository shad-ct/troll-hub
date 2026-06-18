import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { AudioKey, audioFiles } from "./constants/audio"

function App() {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [query, setQuery] = useState("")
	const [playingKey, setPlayingKey] = useState<string | null>(null)

	const playAudio = useCallback((audioName: AudioKey) => {
		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.src = audioFiles[audioName]
			audioRef.current
				.play()
				.then(() => setPlayingKey(audioName))
				.catch((error: unknown) =>
					console.error("Audio playback failed:", error)
				)
		}
	}, [])

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return
		const handleEnded = () => setPlayingKey(null)
		audio.addEventListener("ended", handleEnded)
		return () => audio.removeEventListener("ended", handleEnded)
	}, [])

	const audioList = useMemo(() => {
		return Object.entries(audioFiles).map(([key, path]) => ({
			key,
			name: (path.split("/").pop() || "").replace(/\.mp3$/i, ""),
		}))
	}, [])

	const filteredList = useMemo(() => {
		if (!query.trim()) return audioList
		const q = query.toLowerCase()
		return audioList.filter(
			({ key, name }) =>
				key.toLowerCase().includes(q) || name.toLowerCase().includes(q)
		)
	}, [audioList, query])

	const stopAudio = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.pause()
			audioRef.current.currentTime = 0
			setPlayingKey(null)
		}
	}, [])

	useEffect(() => {
		const audioListRef = filteredList
		const handleKeyPress = (event: KeyboardEvent) => {
			const active = document.activeElement
			if (
				active &&
				(active.tagName === "INPUT" || active.tagName === "TEXTAREA")
			)
				return

			if (event.code === "Space") {
				event.preventDefault()
				stopAudio()
				return
			}

			const key = event.key.toLowerCase()
			if (audioListRef.some((item) => item.key === key)) {
				playAudio(key as AudioKey)
			}
		}

		window.addEventListener("keydown", handleKeyPress)
		return () => window.removeEventListener("keydown", handleKeyPress)
	}, [filteredList, playAudio, stopAudio])

	return (
		<div style={{ height: "100dvh" }} className="bg-gray-950 text-white flex flex-col overflow-hidden">
			{/* Header */}
			<header className="shrink-0 bg-gray-950/90 backdrop-blur-sm border-b border-gray-800 px-3 py-2">
				<div className="flex items-center gap-3">
					<h1 className="text-base font-extrabold text-red-500 tracking-tight shrink-0">
						🎭 Troll Hub
					</h1>
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
						{filteredList.length} / {audioList.length}
					</span>
				</div>
			</header>

			{/* Grid — fills all remaining space */}
			<main className="flex-1 overflow-hidden p-2" style={{ minHeight: 0 }}>
				{filteredList.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full text-gray-500">
						<span className="text-4xl mb-3">🔇</span>
						<p>No sounds found for "<span className="text-white">{query}</span>"</p>
						<button onClick={() => setQuery("")} className="mt-3 text-sm text-red-400 hover:text-red-300 underline">
							Clear search
						</button>
					</div>
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
						{filteredList.map(({ key, name }) => {
							const isPlaying = playingKey === key
							return (
								<button
									key={key}
									onClick={() => playAudio(key as AudioKey)}
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
									{/* Square image on the left */}
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

									{/* Text on the right */}
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

			<audio ref={audioRef} />
		</div>
	)
}

export default App
