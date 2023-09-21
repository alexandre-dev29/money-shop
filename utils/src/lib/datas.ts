const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'CLIENT', uid: 'client', sortable: true },
  { name: 'PHONE NUMBER', uid: 'phone_number', sortable: true },
  { name: 'Transaction Type', uid: 'transaction_type', sortable: true },
  { name: 'AMOUNT BEFORE', uid: 'amount_before', sortable: true },
  { name: 'AMOUNT', uid: 'amount' },
  { name: 'ACCOUNT', uid: 'account' },
  { name: 'DATE TRANSACTION', uid: 'date_transaction', sortable: true },
];

const statusOptions = [
  { name: 'Depot', uid: 'depot' },
  { name: 'Retrait', uid: 'retrait' },
  { name: 'Approvisionement', uid: 'approvisionement' },
];

const users = [
  {
    id: 1,
    client: 'Tony Reichert',
    phone_number: '+2435344824',
    transaction_type: 'Depot',
    amount_before: 500,
    amount: 200,
    devise: 'USD',
    account: 'Airtel',
    date_transaction: '22-23-2023',
  },
  {
    id: 2,
    client: 'Axel Mwenze',
    phone_number: '+243811724707',
    transaction_type: 'Retrait',
    amount_before: 300000,
    amount: 100000,
    devise: 'FC',
    account: 'Vodacom',
    date_transaction: '22-23-2023',
  },
  {
    id: 3,
    client: 'Dan Kyungu',
    phone_number: '+243975344824',
    transaction_type: 'Approvisionement',
    amount_before: 500,
    amount: 200,
    devise: 'USD',
    account: 'Africell',
    date_transaction: '22-23-2023',
  },
];

export { columns, users, statusOptions };
