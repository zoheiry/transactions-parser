import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import transactions from './transactions.json';
import styled from 'styled-components';

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
    name: 'To account',
    selector: 'toAccount',
    sortable: true,
    width: '200px',
  },
  {
    name: 'Code',
    selector: 'code',
    sortable: true,
    width: '100px',
  },
  {
    name: 'Type',
    selector: 'type',
    sortable: true,
    width: '150px',
  },
  {
    name: 'Outgoing',
    selector: 'outgoing',
    sortable: true,
    width: '100px',
  },
  {
    name: 'Incoming',
    selector: 'incoming',
    sortable: true,
    width: '100px',
  },
  {
    name: 'Amount',
    selector: (row) => parseFloat(row.amountInCents / 100).toFixed(2),
    sortable: true,
    sortFunction: (rowA, rowB) => rowA.amountInCents > rowB.amountInCents ? 1 : -1,
    width: '100px',
  },
  {
    name: 'Notes',
    selector: 'notes',
    sortable: true,
    width: '400px',
    wrap: true,
  },
]

function App() {
  return (
    <Wrapper>
      <DataTable
        columns={columns}
        data={transactions}
        striped
        pagination
      />
    </Wrapper>
  );
}

export default App;
