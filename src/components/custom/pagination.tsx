'use client';

import { FC, useState } from 'react';
import { PaginationContent, PaginationItem, PaginationLink, Pagination as SPagination } from '../ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

interface PaginationProps {
  count: number;
  className?: string;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  defaultPage?: number;
  page?: number;
  onPageChange?: ((page: number) => () => void) | ((page: number) => void);
}

const Pagination: FC<PaginationProps> = ({
  count,
  className,
  defaultPage,
  page,
  onPageChange,
  showFirstButton,
  showLastButton,
  hidePrevButton,
  hideNextButton,
  siblingCount,
  boundaryCount,
}) => {
  const [value, setValue] = useState(defaultPage || page || 1);

  const handleChange = (value: number) => () => {
    setValue(value);
    onPageChange?.(value);
  };

  return (
    <SPagination className={className}>
      <PaginationContent>
        {showFirstButton && (
          <PaginationItem>
            <PaginationLink disabled={value === 1} onClick={handleChange(1)}>
              <DoubleArrowLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}
        {!hidePrevButton && (
          <PaginationItem>
            <PaginationLink disabled={value === 1} onClick={handleChange(value - 1)}>
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}
        {Array.from({ length: count }).map((_, index) => {
          const pageNum = index + 1;
          const pageValue = page || value;
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink isActive={pageValue === pageNum} onClick={handleChange(pageNum)}>
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {!hideNextButton && (
          <PaginationItem>
            <PaginationLink disabled={value === count} onClick={handleChange(value + 1)}>
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}
        {showLastButton && (
          <PaginationItem>
            <PaginationLink disabled={value === count} onClick={handleChange(count)}>
              <DoubleArrowRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </SPagination>
  );
};

export default Pagination;
