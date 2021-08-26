import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import formatAmount from '../utils/formatAmount';

const Wrapper = styled('strong')`
    color: ${({ incoming }) => incoming ? '#118c4f' : '#be3c3a'};
`;

const Price = ({ amount }) => {
    const formattedAmount = formatAmount(amount);
    return <Wrapper incoming={amount > 0}>{formattedAmount}</Wrapper>;
};

Price.propTypes = {
    amount: number,
}

export default Price;