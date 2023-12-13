import { useMemo } from "react";

export const DOTS = "...";


export const usePagination = ({
    siblingCount = 1,
    currentPage,
    totalPageCount,
  }) =>{
    const paginationRange = useMemo(() => {

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
          }

          const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
          const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
          );
          

          const leftRange = leftSiblingIndex > 2 ? [1, DOTS] : [];
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    const rightRange = rightSiblingIndex < totalPageCount - 2 ? [DOTS, totalPageCount] : [];
      
  
      

      
      return [...leftRange, ...middleRange, ...rightRange];
       
      
      
         
        }, [siblingCount, currentPage, totalPageCount]);
          

        return paginationRange;
    };






function range(start, end) {
    const length = end - start + 1;
  
    return Array.from({ length }, (_, index) => index + start);
  }