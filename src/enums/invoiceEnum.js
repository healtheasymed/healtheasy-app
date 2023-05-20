export const invoiceEnum = {
  table: 'subscriptions',
  columns: ['id', 'stripe_customer', 'status', 'product', 'quantity', 'total', 'stripe_subscription', 'stripe_invoice', 'date_start', 'date_end'],
  columnsOpenned: ['invoice_url', 'due_date'],
  columnsPaid: ['invoice_pdf', 'receipt_url'],
  quasarColumns: [
    {
      name: 'id',
      label: 'ID',
      field: 'id',
      align: 'center',
      sortable: true,
    },
    {
      name: 'total',
      label: 'Valor',
      field: 'total',
      align: 'center',
      sortable: true,
    },
    {
      name: 'quantity',
      label: 'Qtd. de Chaves',
      field: 'quantity',
      align: 'center',
      sortable: true,
    },
    {
      name: 'useful_date',
      label: 'Período de Uso',
      field: 'useful_date',
      align: 'center',
      sortable: true,
    },
    {
      name: 'actions',
      label: 'Ações',
      field: 'actions',
      align: 'center',
      sortable: false,
    },
  ],
  quasarOpennedColumns: [
    {
      name: 'due_date',
      label: 'Data de Vencimento',
      field: 'due_date',
      align: 'center',
      sortable: true,
    },
  ],
  quasarPaidColumns: [
    {
      name: 'payment_date',
      label: 'Data de Pagamento',
      field: 'payment_date',
      align: 'center',
      sortable: true,
    },
  ],
};
