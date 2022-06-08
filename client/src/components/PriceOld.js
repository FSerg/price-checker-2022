import React from 'react';
import { Statistic } from 'semantic-ui-react';

const PriceOld = ({ price, priceOld }) => {

  if (priceOld === 0 || priceOld <= price) {
    return null;
  }

  return (
    <Statistic size='huge' color='red' horizontal>
      <Statistic.Value style={{ textDecoration: 'line-through' }}>{priceOld}</Statistic.Value>
      <Statistic.Label>руб.</Statistic.Label>
    </Statistic>);

};

export default PriceOld;
