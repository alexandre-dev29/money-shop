'use client';
import React, { useState } from 'react';
import Datepicker, { DateType } from 'react-tailwindcss-datepicker';
import { CalendarIcon } from 'lucide-react';
import moment from 'moment';

import { useTransactionListState } from 'states';
import { FilteredTransactionList } from 'ui';

const TransactionPage = () => {
  const [value, setValue] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({
    startDate: null,
    endDate: null,
  });
  const { listOfTransactions } = useTransactionListState();
  const [filteredTransaction, setFilteredTransaction] =
    useState(listOfTransactions);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleValueChange = ({ endDate, startDate }) => {
    const filteredResult = listOfTransactions.filter((value1) => {
      return moment(inverseAndHandleDate(value1.date_transaction)).isBetween(
        moment(startDate),
        moment(endDate),
        null,
        '[]',
      );
    });
    setFilteredTransaction(filteredResult);
    setValue({ startDate: startDate, endDate: endDate });
  };
  const inverseAndHandleDate = (datestring: string): string => {
    const dateToTreat = datestring.split(' ')[0];
    return dateToTreat.split('/').reverse().join('-');
  };

  return (
    <>
      <section className={'container py-8'}>
        <div className={'w-[15vw] relative'}>
          <Datepicker
            value={value}
            useRange={true}
            onChange={(value, e) => {
              handleValueChange({
                startDate: value?.startDate,
                endDate: value?.endDate,
              });
            }}
            maxDate={new Date()}
            displayFormat={'DD/MM/YYYY'}
            primaryColor={'amber'}
            placeholder={'Select date'}
            toggleIcon={(isOpen) => (
              <CalendarIcon className={'absolute top-0 hidden'} />
            )}
            inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full  focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </section>
      <FilteredTransactionList
        listOfTransactionFiltered={filteredTransaction}
      />
    </>
  );
};

export default TransactionPage;
