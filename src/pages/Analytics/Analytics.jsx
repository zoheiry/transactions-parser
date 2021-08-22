import React, { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { array } from 'prop-types';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import groupByCategory from '../../utils/groupByCategory';
import filterTransactions from '../../utils/filterTransactions';
import searchToFilters from '../../utils/searchToFilters';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StyledInput = styled('input')`
    padding: 8px;
    width: 300px;
    border: solid 1px #aaa;
    border-radius: 4px;
    margin: 20px 0;
`;

const Analytics = ({ transactions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOptions, setFilterOptions] = useState();

    const onSearch = () => {
        const filters = searchToFilters(searchTerm);
        setFilterOptions(filters);
    }

    const chartData = useMemo(() =>
        groupByCategory(
            filterTransactions(transactions, filterOptions)
        ).sort((a, b) => a.total > b.total ? 1 : -1)
        , [transactions, filterOptions]
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    }

    return (
        <div>
            <StyledInput type="text" placeholder="Filter" onChange={handleSearchChange} onKeyPress={handleKeyPress} />
            <PieChart width={800} height={500}>
                <Pie data={chartData} dataKey="total" nameKey="category" label={({ index }) => chartData[index].category}>
                    {chartData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
      );
}

Analytics.propTypes = {
    transactions: array.isRequired,
};

export default Analytics