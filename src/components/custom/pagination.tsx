'use client';

import { FC, useState } from 'react';
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  Pagination as SPagination,
} from '../ui/pagination';
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
  siblingCount = 1,
  boundaryCount = 1,
}) => {
  const [value, setValue] = useState(defaultPage || page || 1);

  const handleChange = (value: number) => () => {
    setValue(value);
    onPageChange?.(value);
  };

  const createPageRange = () => {
    const totalPageNumbers = siblingCount * 2 + boundaryCount * 2 + 3; // Total pages to be shown including ellipsis

    // If total pages to be shown is greater than or equal to count, show all pages
    if (totalPageNumbers >= count) {
      return Array.from({ length: count }, (_, index) => index + 1);
    }

    const leftSiblingIndex = Math.max(value - siblingCount, boundaryCount + 1);
    const rightSiblingIndex = Math.min(value + siblingCount, count - boundaryCount);

    const showLeftEllipsis = leftSiblingIndex > boundaryCount + 1;
    const showRightEllipsis = rightSiblingIndex < count - boundaryCount;

    const pages: (number | 'ellipsis')[] = [];

    // Add the first set of boundary pages
    for (let i = 1; i <= boundaryCount; i++) {
      pages.push(i);
    }

    // Calculate remaining pages after adding boundary pages and ellipsis
    let remainingPages =
      totalPageNumbers - (boundaryCount * 2 + (showLeftEllipsis ? 1 : 0) + (showRightEllipsis ? 1 : 0));

    // Adjust left and right sibling ranges to fill the remaining pages
    let adjustedLeftSiblingIndex = leftSiblingIndex;
    let adjustedRightSiblingIndex = rightSiblingIndex;

    // If left side is too small, shift pages to the right
    if (leftSiblingIndex === boundaryCount + 1) {
      adjustedRightSiblingIndex = Math.min(
        rightSiblingIndex + (siblingCount * 2 - (rightSiblingIndex - leftSiblingIndex)),
        count - boundaryCount,
      );
    }

    // If right side is too small, shift pages to the left
    if (rightSiblingIndex === count - boundaryCount) {
      adjustedLeftSiblingIndex = Math.max(
        leftSiblingIndex - (siblingCount * 2 - (rightSiblingIndex - leftSiblingIndex)),
        boundaryCount + 1,
      );
    }

    // Add left ellipsis if needed
    if (showLeftEllipsis) {
      pages.push('ellipsis');
    }

    // Add middle pages
    for (let i = adjustedLeftSiblingIndex; i <= adjustedRightSiblingIndex && remainingPages > 0; i++) {
      pages.push(i);
      remainingPages--;
    }

    // Add right ellipsis if needed
    if (showRightEllipsis) {
      pages.push('ellipsis');
    }

    // Add the last set of boundary pages
    for (let i = count - boundaryCount + 1; i <= count; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = createPageRange();
  const result = page || value;

  return (
    <SPagination className={className}>
      <PaginationContent>
        {showFirstButton && (
          <PaginationItem>
            <PaginationLink disabled={result === 1} onClick={handleChange(1)}>
              <DoubleArrowLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}
        {!hidePrevButton && (
          <PaginationItem>
            <PaginationLink disabled={result === 1} onClick={handleChange(result - 1)}>
              <ChevronLeftIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}
        {pages.map((pageNum, index) =>
          pageNum === 'ellipsis' ? (
            <PaginationItem key={'ellipsis' + index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNum}>
              <PaginationLink isActive={result === pageNum} onClick={handleChange(pageNum)}>
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        {!hideNextButton && (
          <PaginationItem>
            <PaginationLink disabled={result === count} onClick={handleChange(result + 1)}>
              <ChevronRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}
        {showLastButton && (
          <PaginationItem>
            <PaginationLink disabled={result === count} onClick={handleChange(count)}>
              <DoubleArrowRightIcon className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </SPagination>
  );
};

export default Pagination;
