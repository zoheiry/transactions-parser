import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import transactions from './transactions.json';
import styled from 'styled-components';
import Price from './components/Price';

const Wrapper = styled('div')`
  padding: 40px;
  margin: 0 auto;
`;

const columns = [
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
]

function App() {
  return (
    <Wrapper>
      <DataTable
        columns={columns}
        data={transactions}
        striped
        pagination
        highlightOnHover
        paginationRowsPerPageOptions={[10, 50, 100, 1000, 10000]}
      />
    </Wrapper>
  );
}

export default App;
