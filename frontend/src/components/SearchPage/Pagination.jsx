import { useNavigate } from "react-router-dom";
import { scrollToTopOfPage } from "../../util/util";

export const Pagination = ({
  listingsProperties,
  handleChangeListingProperties,
}) => {
  const { currentPage, totalPages } = listingsProperties;

  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    handleChangeListingProperties((prev) => ({
      ...prev,
      currentPage: page - 1,
    }));

    // Scroll function will not work when the new page is
    // the start or end of the list.
    // This is due to the button becoming immediately disabled
    // after the state update, interfering with the scroll behavior.
    // Using setTimeOut pushes the scroll to the next event loop,
    // running the function after the state has been updated.
    setTimeout(() => {
      scrollToTopOfPage();
    }, 0);
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
        className={`p-2 w-16 border rounded hover:bg-black hover:text-white 
          disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-inherit`}
      >
        Prev
      </button>

      {generatePageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`p-2 border rounded w-10 ${
              currentPage + 1 === page ? "bg-black text-white" : ""
            } hover:bg-black hover:text-white`}
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
        className={`p-2 w-16 border rounded hover:bg-black hover:text-white
          disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-inherit`}
      >
        Next
      </button>
    </div>
  );
};
