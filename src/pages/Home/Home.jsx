import { array } from 'prop-types';
import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { columns, paginationRowsPerPageOptions } from './tableConfig';

const Wrapper = styled('div')`
  padding: 40px;
  margin: 0 auto;
`;


function Home({ transactions }) {
  return (
    <Wrapper>
      <DataTable
        columns={columns}
        data={transactions}
        striped
        pagination
        highlightOnHover
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      />
    </Wrapper>
  );
}

Home.propTypes = {
    transactions: array.isRequired,
}

export default Home;
