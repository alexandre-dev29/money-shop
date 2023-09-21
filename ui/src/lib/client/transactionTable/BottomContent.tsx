'use client';
import React from 'react';
import { Pagination, Selection } from '@nextui-org/react';

export const BottomContent = ({
  hasSearchFilter,
  itemsLength,
  page,
  pages,
  selectedKeys,
  setPage,
}: {
  selectedKeys: Selection;
  page: number;
  pages: number;
  itemsLength: number;
  hasSearchFilter: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${itemsLength} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, itemsLength, page, pages, hasSearchFilter]);
};
