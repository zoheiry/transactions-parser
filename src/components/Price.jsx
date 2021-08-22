import React from 'react';
import styled from 'styled-components';
import { number } from 'prop-types';
import formatAmountInCents from '../utils/formatAmountInCents';

const Wrapper = styled('strong')`
    color: ${({ incoming }) => incoming ? '#118c4f' : '#be3c3a'};
`;

const Price = ({ amountInCents }) => {
    const amount = formatAmountInCents(amountInCents);
    return <Wrapper incoming={amountInCents > 0}>{amount}</Wrapper>;
};

Price.propTypes = {
    amountInCents: number,
}

export default Price;