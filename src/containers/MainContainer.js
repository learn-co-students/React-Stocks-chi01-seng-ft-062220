import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    buy: [],
    filter: 'All',
    sort: 'None'
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
      .then(resp=> resp.json())
      .then(data => {
        this.setState({ stocks: data });
      })
  }

  handleStockClick = (stock) => {
    if(!this.state.buy.includes(stock)){
      this.setState({ buy: [...this.state.buy, stock] });
    }else if(this.state.buy.includes(stock)){
      const removeItem = stock
      const newBuyItems = this.state.buy.filter(buy => buy !== removeItem)
      this.setState({ buy: newBuyItems });
    }
  }

  updateFilter = type  => {
    this.setState({ filter: type })
  }

  updateSort = sortBy => {
    this.setState({ sort: sortBy })
  }

  calculateDisplayStocks = () => {
    let filteredStocks = [...this.state.stocks]
    if(this.state.filter !== "All"){
      filteredStocks =  filteredStocks.filter(stock => stock.type === this.state.filter)        
    } 

    switch(this.state.sort){
      case "Alphabetically":
        return filteredStocks.sort((a,b) => a.name > b.name ? 1 : -1)
      case "Price":
          return filteredStocks.sort((a,b) => a.price > b.price ? 1 : -1)
      default:
        return filteredStocks
    }
  }

  render() {
    //console.log(this.state)
    let displayStocks = this.calculateDisplayStocks()
    return (
      <div>
        <SearchBar filter={this.state.filter} sort={this.state.sort} updateFilter={this.updateFilter} updateSort={this.updateSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={displayStocks}
              handleStockClick={this.handleStockClick}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer 
              handleStockClick={this.handleStockClick}
              buy={this.state.buy} 
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
