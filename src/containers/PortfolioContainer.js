import React, { Component } from 'react';
import Stock from '../components/Stock'

const PortfolioContainer = props => {
    return (
      <div>
        <h2>My Portfolio</h2>
          {props.buy.map(stock => <Stock key={stock.id} stock={stock} handleStockClick={props.handleStockClick}/> )}
      </div>
    );
}

export default PortfolioContainer;
