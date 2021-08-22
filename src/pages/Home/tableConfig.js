import React from 'react';
import Price from '../../components/Price';

export const columns = [
    {
      name: 'Date',
      selector: 'date',
      sortable: true,
      width: '150px',
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      width: '300px',
    },
    {
      name: 'Category',
      selector: 'category',
      sortable: true,
      width: '150px',
    },
    {
      name: 'To account',
      selector: 'toAccount',
      sortable: true,
      width: '200px',
    },
    {
      name: 'Type',
      selector: 'type',
      sortable: true,
      center: true,
      width: '150px',
    },
    {
      name: 'Outgoing',
      selector: ({ outgoing }) => outgoing ? '✓' : '',
      sortable: true,
      center: true,
      width: '100px',
    },
    {
      name: 'Incoming',
      selector: ({ incoming }) => incoming ? '✓' : '',
      sortable: true,
      center: true,
      width: '100px',
    },
    {
      name: 'Amount',
      cell: ({ amountInCents }) => <Price amountInCents={amountInCents} />,
      selector: 'amountInCents',
      sortable: true,
      sortFunction: (rowA, rowB) => Math.abs(rowA.amountInCents) > Math.abs(rowB.amountInCents) ? 1 : -1,
      center: true,
      width: '100px',
    },
    {
      name: 'Notes',
      selector: 'notes',
      sortable: true,
      width: '400px',
      wrap: true,
    }
  ];

export const paginationRowsPerPageOptions = [10, 50, 100, 1000, 3000, 10000];