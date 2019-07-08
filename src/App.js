import React from 'react';
import { Table } from '@fashiontrade/wardrobe';
import transactions from './transactions.json';
import styled from 'styled-components';

const Wrapper = styled('div')`
  padding: 40px;
  margin: 0 auto;
`;
                
const LAYOUT = [0.7, 1, 1, 1, 0.5, 1, 0.5, 0.5, 0.5, 1];

function App() {
  return (
    <Wrapper>
      <Table layout={LAYOUT}>
        <Table.Header>
          <Table.Cell>Date</Table.Cell>
          <Table.Cell>Timestamp</Table.Cell>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>To account</Table.Cell>
          <Table.Cell>Code</Table.Cell>
          <Table.Cell>Type</Table.Cell>
          <Table.Cell>Outgoing</Table.Cell>
          <Table.Cell>Incoming</Table.Cell>
          <Table.Cell>Amount</Table.Cell>
          <Table.Cell>Notes</Table.Cell>
        </Table.Header>
        {transactions.map((t, i) =>
          <Table.Row key={`transaction-${i}`}>
            {Object.keys(t).map((key, index) => {
              if (key === 'incoming' || key === 'outgoing') {
                return <Table.Cell>{(t[key] ? 'true' : '')}</Table.Cell>  
              }
              return <Table.Cell>{t[key]}</Table.Cell>
            })}
          </Table.Row>
        )}
      </Table>
    </Wrapper>
  );
}

export default App;
