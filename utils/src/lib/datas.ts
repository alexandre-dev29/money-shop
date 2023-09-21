const columns = [
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'CLIENT', uid: 'client', sortable: true },
  { name: 'PHONE NUMBER', uid: 'phone_number', sortable: true },
  { name: 'Transaction Type', uid: 'transaction_type', sortable: true },
  { name: 'PIECE INDENTITE', uid: 'piece_identite', sortable: true },
  { name: 'NUMERO REFERENCE', uid: 'numero_reference', sortable: true },
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

export { columns, statusOptions };
