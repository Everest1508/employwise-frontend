interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
  }
  
  const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
    return (
      <div className="flex justify-end items-center mt-6 space-x-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-gray-700 text-lg">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  