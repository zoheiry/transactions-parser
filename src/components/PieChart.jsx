import React from 'react';
import PropTypes from 'prop-types';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import formatAmount from '../utils/formatAmount';

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChart = ({ data, nameKey, title, colors = DEFAULT_COLORS }) => {
  return (
    <RechartsPieChart width={800} height={500}>
      <Pie
        data={data}
        dataKey='total'
        nameKey={nameKey}
        label={({ index }) => formatAmount(data[index].total)}
      >
        {data.map((_entry, index) => (
          <Cell key={`${title}-cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => formatAmount(value)}/>
      <Legend />
    </RechartsPieChart>
  );
}

PieChart.propTypes = {
  data: PropTypes.array.isRequired,
  nameKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PieChart;