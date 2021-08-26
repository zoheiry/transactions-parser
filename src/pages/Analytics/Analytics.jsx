import React from 'react';
import PropTypes from 'prop-types';
import ChartWrapper from '../../components/ChartWrapper';
import { CHART_TYPES, TRANSACTION_GROUPS } from '../../constants';

const Analytics = ({ transactions }) => {
  return (
    <div>
      <div>
        <ChartWrapper
          transactions={transactions}
          showFilterField
          showGroupByField
          defaultGroupBy={TRANSACTION_GROUPS.CATEGORY}
          chartType={CHART_TYPES.PIE_CHART}
          chartTitle="my-first-pie-chart"
          defaultFilters={{ category: '!myself', dateFrom: '2021-08-01', direction: 'outgoing' }}
        />
      </div>
      <div>
        <ChartWrapper
          transactions={transactions}
          showFilterField
          showGroupByField
          defaultGroupBy={TRANSACTION_GROUPS.CATEGORY}
          chartType={CHART_TYPES.BAR_CHART}
          chartTitle="my-first-bar-chart"
          defaultFilters={{ category: '!myself', dateFrom: '2021-08-01', direction: 'outgoing' }}
        />
      </div>
    </div>
  );
}

Analytics.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default Analytics