import ReactPaginate from "react-paginate";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <ReactPaginate
      breakLabel={<span className="px-2">...</span>}
      nextLabel={
        <Button variant="outline" size="sm">
          Next
        </Button>
      }
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      previousLabel={
        <Button variant="outline" size="sm">
          Previous
        </Button>
      }
      forcePage={currentPage - 1}
      containerClassName="flex gap-1 items-center"
      pageClassName=""
      pageLinkClassName=""
      activeClassName=""
      activeLinkClassName=""
      renderOnZeroPageCount={null}
      pageLabelBuilder={(page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
        >
          {page}
        </Button>
      )}
      previousClassName=""
      nextClassName=""
      breakClassName=""
    />
  );
}
