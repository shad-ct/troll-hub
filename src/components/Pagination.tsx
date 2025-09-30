interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	if (totalPages <= 1) {
		return null
	}

	const handlePrevious = () => {
		onPageChange(Math.max(currentPage - 1, 1))
	}

	const handleNext = () => {
		onPageChange(Math.min(currentPage + 1, totalPages))
	}

	return (
		<div className='flex items-center justify-center gap-4 mt-8'>
			<button
				onClick={handlePrevious}
				disabled={currentPage === 1}
				className='px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'>
				Previous
			</button>
			<span className='text-lg text-gray-300'>
				Page {currentPage} of {totalPages}
			</span>
			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				className='px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed'>
				Next
			</button>
		</div>
	)
}

export default Pagination
