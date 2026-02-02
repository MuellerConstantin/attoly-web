import { useMemo } from "react";
import { Button } from "react-aria-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tv } from "tailwind-variants";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  size?: "sm" | "md" | "lg";
}

const pagination = tv({
  slots: {
    base: "flex items-center gap-2",
    next: "rounded-md p-2 bg-slate-200 dark:bg-gray-900 p-2 hover:bg-slate-300 hover:dark:bg-slate-700 flex items-center justify-center",
    prev: "rounded-md p-2 bg-slate-200 dark:bg-gray-900 p-2 hover:bg-slate-300 hover:dark:bg-slate-700 flex items-center justify-center text-slate-800 dark:text-white",
    item: "rounded-md p-2 flex items-center justify-center",
    icon: "text-slate-800 dark:text-white",
  },
  variants: {
    size: {
      sm: {
        next: "h-6 w-6",
        prev: "h-6 w-6",
        item: "h-6 w-6 text-xs",
      },
      md: {
        next: "h-8 w-8",
        prev: "h-8 w-8",
        item: "h-8 w-8",
      },
      lg: {
        next: "h-10 w-10",
        prev: "h-10 w-10",
        item: "h-10 w-10",
      },
    },
    isDisabled: {
      true: {
        next: "cursor-not-allowed opacity-50",
        prev: "cursor-not-allowed opacity-50",
        item: "cursor-not-allowed opacity-50",
      },
      false: {
        next: "cursor-pointer",
        prev: "cursor-pointer",
        item: "cursor-pointer",
      },
    },
    active: {
      true: {
        item: "bg-orange-500 text-white",
      },
      false: {
        item: "bg-slate-200 dark:bg-gray-900 text-slate-800 dark:text-white p-2 hover:bg-slate-300 hover:dark:bg-slate-700",
      },
    },
  },
});

export function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  size = "md",
}: PaginationProps) {
  const {
    base: baseClass,
    next: nextClass,
    prev: prevClass,
    item: itemClass,
    icon: iconClass,
  } = pagination({ size });

  const startPage = useMemo(() => Math.max(1, currentPage - 2), [currentPage]);
  const endPage = useMemo(
    () => Math.min(totalPages, currentPage + 2),
    [totalPages, currentPage],
  );

  const pages = useMemo(() => {
    const pages: number[] = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [startPage, endPage]);

  return (
    <div className={baseClass()}>
      <Button
        onPress={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        className={prevClass({ isDisabled: currentPage === 1 })}
      >
        <ChevronLeft className={iconClass()} />
      </Button>
      <div className="flex gap-2 md:hidden">
        {pages
          .filter((page) => Math.abs(page - currentPage) <= 1)
          .map((page) => (
            <Button
              key={page}
              onPress={() => onPageChange(page)}
              className={itemClass({ active: page === currentPage })}
            >
              {page}
            </Button>
          ))}
      </div>
      <div className="hidden gap-2 md:flex">
        {pages.map((page) => (
          <Button
            key={page}
            onPress={() => onPageChange(page)}
            className={itemClass({ active: page === currentPage })}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        onPress={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        className={nextClass({ isDisabled: currentPage === totalPages })}
      >
        <ChevronRight className={iconClass()} />
      </Button>
    </div>
  );
}
