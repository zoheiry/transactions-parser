import React from 'react';
import PropTypes from 'prop-types';
import { BarChart as RechartsBarChart, Bar, Tooltip, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import formatAmount from '../utils/formatAmount';

const BarChart = ({ data, nameKey, title }) => (
  <RechartsBarChart width={800} height={500} data={data} barSize={20}>
    <Bar fill="#0088FE" dataKey="total">
      {data.map((_entry, index) => (
        <Cell key={`${title}-cell-${index}`} fill="#0088FE" />
      ))}
    </Bar>
    <Tooltip formatter={(value) => formatAmount(value)} cursor={false} />
    <YAxis />
    <XAxis dataKey={nameKey} />
    <CartesianGrid strokeDasharray="3 3" />
  </RechartsBarChart>
);

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  nameKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BarChart;