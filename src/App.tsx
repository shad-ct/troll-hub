import { useEffect, useRef, useState } from "react"
import { AudioKey, audioFiles } from "./constants/audio"
import Pagination from "./components/Pagination"

function App() {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [query, setQuery] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 8

	const playAudio = (audioName: AudioKey) => {
		if (audioRef.current) {
			audioRef.current.src = audioFiles[audioName]
			audioRef.current
				.play()
				.catch((error: unknown) =>
					console.error("Audio playback failed:", error)
				)
		}
	}

	useEffect(() => {
		setCurrentPage(1)
	}, [query])

	const audioList = Object.entries(audioFiles).map(([key, path]) => ({
		key,
		name: path.split("/").pop() || "",
	}))

	const filteredList = audioList.filter(({ key, name }) => {
		if (!query.trim()) return true
		const q = query.toLowerCase()
		return key.toLowerCase().includes(q) || name.toLowerCase().includes(q)
	})

	const totalPages = Math.ceil(filteredList.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const paginatedList = filteredList.slice(startIndex, endIndex)
	
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			const active = document.activeElement
			if (
				active &&
				(active.tagName === "INPUT" || active.tagName === "TEXTAREA")
			) {
				return
			}

			const key = event.key.toLowerCase()
			if (paginatedList.some((item) => item.key === key)) {
				playAudio(key as AudioKey)
			}
		}

		window.addEventListener("keydown", handleKeyPress)

		return () => {
			window.removeEventListener("keydown", handleKeyPress)
		}
	}, [paginatedList])

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4'>
			<h1 className='text-4xl md:text-6xl font-bold mb-8 text-red-500 animate-pulse'>
				The Troll Hub 😂
			</h1>
			<div className='w-full max-w-6xl mb-6'>
				<div className='flex items-center gap-3 mb-4'>
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder='Search by key or filename...'
						className='flex-1 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none border border-gray-700'
					/>
					<button
						onClick={() => setQuery("")}
						className='px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm'>
						Clear
					</button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{paginatedList.map(({ key, name }) => (
						<div
							key={key}
							className='bg-gray-800 p-4 rounded-lg shadow-lg'>
							<img
								src={`/images/${key}.png`}
								alt={name}
								className='w-full h-32 object-cover rounded mb-2'
							/>
							<h3 className='text-lg font-semibold'>
								Key: {key.toUpperCase()}
							</h3>
							<p className='text-sm text-gray-400 mb-2'>{name}</p>
							<button
								onClick={() => playAudio(key as AudioKey)}
								className='w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors'>
								Play
							</button>
						</div>
					))}
				</div>

				{filteredList.length === 0 && (
					<p className='text-center text-gray-400 mt-6'>
						No audio found for "{query}"
					</p>
				)}

				{/* ✨ 2. Use the new Pagination component */}
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			</div>
			<audio ref={audioRef} />
			<p className='mt-8 text-lg text-gray-400 text-center'>
				Created by{" "}
				<a
					href='https://github.com/shad-ct'
					className='text-red-500 underline'>
					Shad C T
				</a>
			</p>
		</div>
	)
}

export default App
