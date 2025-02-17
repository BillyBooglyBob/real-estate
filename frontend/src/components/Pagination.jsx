import { useNavigate } from "react-router-dom";

export const Pagination = ({
  listingsProperties,
  handleChangeListingProperties,
}) => {
  const { currentPage, totalPages } = listingsProperties;
  const navigate = useNavigate();

  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    handleChangeListingProperties((prev) => ({
      ...prev,
      currentPage: page - 1,
    }))
  };

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if they fit
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); // Always show first page

      if (currentPage > 4) pages.push("...");

      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push("...");

      pages.push(totalPages); // Always show last page
    }

    return pages;
  };

  return (
    <div className="flex gap-2 justify-center mt-5">
      <button
        onClick={() => handlePageChange(currentPage)}
        disabled={currentPage === 0}
        className="p-2 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      {generatePageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`p-2 border rounded ${
              currentPage + 1 === page ? "bg-gray-300" : ""
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="p-2">
            ...
          </span>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 2)}
        disabled={currentPage + 1 >= totalPages}
        className="p-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};
