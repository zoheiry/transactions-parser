import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TRANSACTION_GROUPS } from '../constants';

const StyledSelect = styled('select')`
  padding: 8px;
  width: 300px;
  border: solid 1px #aaa;
  border-radius: 4px;
  margin: 20px 0;
`;


const GroupBySelect = ({ id, onSelect, value }) => (
  <StyledSelect value={value} onChange={(e) => onSelect(e.target.value)}>
    {Object.values(TRANSACTION_GROUPS).map((field) => (
      <option value={field} key={`${id}-group-by-${field}-option`}>{field}</option>
    ))}
  </StyledSelect>
);

GroupBySelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default GroupBySelect;