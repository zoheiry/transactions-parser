import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CHART_TYPES } from '../constants';
import useSmartFilter from '../hooks/useSmartFilter';
import FilterInput from './FilterInput';
import PieChart from './PieChart';
import BarChart from './BarChart';
import GroupBySelect from './GroupBySelect';
import useGroupTransactions from '../hooks/useGroupTransactions';
import filtersToSearch from '../utils/filtersToSearch';

const Wrapper = styled('div')`
  padding: 40px;
  margin: 0 auto;
`;

const ChartWrapper = ({
  transactions,
  showDateField,
  showFilterField,
  showGroupByField,
  defaultGroupBy,
  defaultDateFrom,
  defaultDateTo,
  defaultFilters,
  chartType,
  chartTitle,
  sortBy = 'total',
}) => {
  const [searchQuery, setSearchQuery] = useState(filtersToSearch(defaultFilters));
  const [groupByField, setGroupByField] = useState(defaultGroupBy);
  const filteredTransactions = useSmartFilter({ transactions, searchQuery });
  const groupedTransactions = useGroupTransactions({ transactions: filteredTransactions, groupByField });
  const chartData = groupedTransactions.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);

  return (
    <Wrapper>
      {showFilterField && <FilterInput value={searchQuery} onEnter={setSearchQuery} />}
      {showGroupByField && <GroupBySelect value={groupByField} onSelect={setGroupByField} id={`${chartTitle}-group-by-select`} />}
      {chartType === CHART_TYPES.PIE_CHART && (
        <PieChart
          data={chartData}
          nameKey={groupByField}
          title={chartTitle}
        />
      )}

      {chartType === CHART_TYPES.BAR_CHART && (
        <BarChart
          data={chartData}
          nameKey={groupByField}
          title={chartTitle}
        />
      )}
    </Wrapper>
  );
}

ChartWrapper.propTypes = {
  transactions: PropTypes.array.isRequired,
  showDateField: PropTypes.bool,
  showFilterField: PropTypes.bool,
  showGroupByField: PropTypes.bool,
  defaultGroupBy: PropTypes.string,
  defaultFilters: PropTypes.object,
  defaultDateFrom: PropTypes.string,
  defaultDateTo: PropTypes.string,
  chartType: PropTypes.oneOf(Object.values(CHART_TYPES)).isRequired,
  chartTitle: PropTypes.string,
  sortBy: PropTypes.string,
};

export default ChartWrapper