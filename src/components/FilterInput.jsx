import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled('input')`
  padding: 8px;
  width: 300px;
  border: solid 1px #aaa;
  border-radius: 4px;
  margin: 20px 0;
`;

const FilterInput = ({ onEnter, value }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onEnter(searchQuery);
    }  
  };

  return (
    <StyledInput
      defaultValue={value}
      type="text"
      placeholder="Filter"
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
}

FilterInput.propTypes = {
  onEnter: PropTypes.func.isRequired,
};

export default FilterInput;