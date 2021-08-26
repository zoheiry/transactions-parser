import { array } from 'prop-types';
import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import filterTransactions from '../../utils/filterTransactions';
import searchToFilters from '../../utils/searchToFilters';
import { columns, paginationRowsPerPageOptions } from './tableConfig';

const Wrapper = styled('div')`
  padding: 40px;
  margin: 0 auto;
`;

const StyledInput = styled('input')`
    padding: 8px;
    width: 300px;
    border: solid 1px #aaa;
    border-radius: 4px;
    margin: 20px 0;
`;


const Home = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState();

  const onSearch = () => {
    const filters = searchToFilters(searchTerm);
    setFilterOptions(filters);
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  }

  const filteredTransactions = useMemo(() =>
    filterTransactions(transactions, filterOptions)
    , [transactions, filterOptions]
  );

  return (
    <Wrapper>
      <StyledInput type="text" placeholder="Filter" onChange={handleSearchChange} onKeyPress={handleKeyPress} />
      <DataTable
        columns={columns}
        data={filteredTransactions}
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
