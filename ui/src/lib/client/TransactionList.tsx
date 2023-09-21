'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Selection,
  SortDescriptor,
} from '@nextui-org/react';
import { DotIcon } from 'lucide-react';

import { columns, statusOptions } from 'utils';
import { BottomContent } from './transactionTable/BottomContent';
import { TopContent } from './transactionTable/TopContent';
import { statusColorMap, SubAccount, Transaction } from 'types';

const INITIAL_VISIBLE_COLUMNS = [
  'client',
  'phone_number',
  'transaction_type',
  'amount_before',
  'amount',
  'account',
  'date_transaction',
];

type User = Transaction;

export function TransactionList({
  transactions,
  subAccounts,
}: {
  transactions: Transaction[];
  subAccounts: any;
}) {
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(transactions.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...transactions];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) => {
        return (
          user.client.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.phone_number.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.transaction_type)
      );
    }

    return filteredUsers;
  }, [transactions, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: Transaction, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof Transaction];

      switch (columnKey) {
        case 'client':
          return <p className={'font-bold '}>{cellValue}</p>;
        case 'phone_number':
          return <p className={'font-bold '}>{cellValue}</p>;
        case 'amount':
        case 'amount_before':
          return (
            <p>{`${cellValue} ${user.devise === 'USD' ? ' $' : ' FC'}`}</p>
          );
        case 'transaction_type':
          return (
            <Chip
              className="capitalize border-none gap-1 text-white"
              color={statusColorMap[user.transaction_type]}
              size="md"
            >
              {cellValue}
            </Chip>
          );
        case 'actions':
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <DotIcon className="text-default-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const classNames = React.useMemo(
    () => ({
      wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    []
  );

  return (
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={
        <BottomContent
          hasSearchFilter={hasSearchFilter}
          selectedKeys={selectedKeys}
          page={page}
          pages={pages}
          setPage={setPage}
          itemsLength={items.length}
        />
      }
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
      classNames={classNames}
      selectedKeys={selectedKeys}
      selectionMode="single"
      color={'secondary'}
      isStriped={true}
      sortDescriptor={sortDescriptor}
      topContent={
        <TopContent
          onRowsPerPageChange={onRowsPerPageChange}
          onSearchChange={onSearchChange}
          hasSearchFilter={hasSearchFilter}
          setFilterValue={setFilterValue}
          filterValue={filterValue}
          setStatusFilter={setStatusFilter}
          statusFilter={statusFilter}
          setVisibleColumns={setVisibleColumns}
          visibleColumns={visibleColumns}
          subAccountList={subAccounts}
          userLength={transactions.length}
        />
      }
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No transactions found'} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
