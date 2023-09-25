'use client';
import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { statusColorMap, Transaction } from 'types';
import React from 'react';

export const FilteredTransactionList = ({
  listOfTransactionFiltered,
}: {
  listOfTransactionFiltered: Transaction[];
}) => {
  const classNames = React.useMemo(
    () => ({
      wrapper: [],
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
    [],
  );
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 15;

  const pages = Math.ceil(listOfTransactionFiltered.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return listOfTransactionFiltered.slice(start, end);
  }, [page, listOfTransactionFiltered]);

  return (
    <section className={'container'}>
      <p className={'font-bold text-2xl capitalize py-4'}>
        liste des transactions
      </p>
      <Table
        isStriped
        selectionMode={'single'}
        color={'warning'}
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        aria-label="Example static collection table"
        classNames={classNames}
      >
        <TableHeader>
          <TableColumn>Client</TableColumn>
          <TableColumn>Phone Number</TableColumn>
          <TableColumn>Transaction Type</TableColumn>
          <TableColumn>Amount Before</TableColumn>
          <TableColumn>Amount</TableColumn>
          <TableColumn>Account</TableColumn>
          <TableColumn>Date Transaction</TableColumn>
        </TableHeader>
        <TableBody>
          {items.map((currentTransaction) => {
            return (
              <TableRow key={currentTransaction.id}>
                <TableCell>{currentTransaction.client}</TableCell>
                <TableCell>{currentTransaction.phone_number}</TableCell>
                <TableCell>
                  <Chip
                    className="capitalize border-none gap-1 text-white"
                    color={statusColorMap[currentTransaction.transaction_type]}
                    size="md"
                  >
                    {currentTransaction.transaction_type}
                  </Chip>
                </TableCell>
                <TableCell className={'font-bold'}>
                  {`${currentTransaction.amount_before} ${
                    currentTransaction.devise === 'USD' ? ' $' : ' FC'
                  }`}
                </TableCell>
                <TableCell className={'font-bold'}>
                  {`${currentTransaction.amount} ${
                    currentTransaction.devise === 'USD' ? ' $' : ' FC'
                  }`}
                </TableCell>
                <TableCell>{currentTransaction.account}</TableCell>
                <TableCell>{currentTransaction.date_transaction}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
};
