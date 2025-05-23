'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from '../ui/table'
import ReactPaginate from 'react-paginate'
import { NextPagination, PreviousPagination } from '../svg'
import { cn } from '@/lib/utils'
import { Text } from '../shared/Text'
import { Skeleton } from '../ui/skeleton'

const pagination_Style = {
  nextLabel: <NextPagination />,
  previousLabel: <PreviousPagination />,
  containerClassName:
    'flex md:w-fit text-xs rounded-lg  ms-auto items-center bg-thick-purple-5 py-1',
  activeClassName: 'shadow bg-white',
  previousClassName: 'w-fit px-2',
  nextClassName: 'w-fit px-2',
  pageClassName:
    'gap-2 px-2 md:px-4 py-2 text-xs md:text-sm rounded-lg text-center md:w-auto w-[1.5rem] text-thick-purple',
}

export const TableLayout = ({
  emptyState = {},
  dataLength,
  tableHeadRow,
  tableHeadRowStyle,
  hideIndexOnMobile,
  children,
  tableHeadRowChildren,
  caption,
  tableHead,
  tableHeadStyle,
  totalPageNumber,
  activePage,
  loading = false,
  skeletonCount = 5,
  skeletonRow,
  paginationStyle,
}) => {
  const handlePageClick = (event) => {
    let page_number = event.selected + 1
    console.log(page_number)
  }

  // Default skeleton row if none provided
  const defaultSkeletonRow = (
    <TableRow>
      {tableHeadRow?.map((_, index) => (
        <TableCell key={index}>
          <Skeleton className='h-4 w-[80%]' />
        </TableCell>
      ))}
    </TableRow>
  )

  const renderSkeletons = () => {
    return Array.from({ length: skeletonCount }).map((_, index) => (
      <React.Fragment key={index}>
        {skeletonRow || defaultSkeletonRow}
      </React.Fragment>
    ))
  }

  return (
    <div className='w-full text-darkblue font-medium flex flex-col justify-between h-full'>
      {tableHead && <div className='my-4'>{tableHead}</div>}

      <div className='block w-full mb-7'>
        <Table>
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            {loading ? (
              <TableRow
                className={cn(
                  'font-[600] text-[16px] bg-none border-none shadow-none',
                  tableHeadRowStyle
                )}
              >
                {tableHeadRow?.map((heading, index) => (
                  <TableHead
                    className={cn(
                      tableHeadStyle,
                      hideIndexOnMobile?.includes(index) && 'hidden'
                    )}
                    key={index}
                  >
                    <Skeleton className='h-4 w-[60%]' />
                  </TableHead>
                ))}
              </TableRow>
            ) : tableHeadRowChildren ? (
              tableHeadRowChildren
            ) : (
              <TableRow
                className={cn(
                  'font-[600] text-[16px] bg-light-grey border-none shadow-none',
                  tableHeadRowStyle
                )}
              >
                {tableHeadRow?.map((heading, index) => (
                  <TableHead
                    className={cn(
                      tableHeadStyle,
                      hideIndexOnMobile?.includes(index) &&
                        'md:table-cell hidden'
                    )}
                    key={index}
                  >
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            )}
          </TableHeader>
          <TableBody className='font-[400] text-[14px]'>
            {loading ? renderSkeletons() : children}
          </TableBody>
        </Table>
      </div>

      {!loading && dataLength < 1 && (
        <div className='flex flex-col items-center justify-center my-[3rem] text-darkblue mx-auto'>
          {emptyState?.subText && (
            <Text style='text-md mb-8' value={emptyState.subText} />
          )}
          {emptyState?.component}
        </div>
      )}

      {!loading && totalPageNumber > 1 && (
        <div
          className={cn(
            paginationStyle,
            'flex flex-wrap-reverse justify-end items-end mt-auto md:flex-wrap-nowrap gap-2'
          )}
        >
          <ReactPaginate
            breakLabel='...'
            nextLabel={pagination_Style.nextLabel}
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={totalPageNumber}
            initialPage={(activePage ? parseInt(activePage) : 1) - 1}
            disableInitialCallback={true}
            previousLabel={pagination_Style.previousLabel}
            renderOnZeroPageCount={null}
            containerClassName={pagination_Style.containerClassName}
            activeClassName={pagination_Style.activeClassName}
            previousClassName={pagination_Style.previousClassName}
            nextClassName={pagination_Style.nextClassName}
            pageClassName={pagination_Style.pageClassName}
          />
        </div>
      )}
    </div>
  )
}
