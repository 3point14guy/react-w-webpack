import React from 'react';
import PropTypes from 'prop-types';



// App is like yield in Rails. it will render all of our JSX
export class App extends React.Component {

  constructor(props) {
    // the keyword super is used to call functions on an objects parent
    super(props);
    this.state = {
      buyItems: ['milk', 'bread', 'eggs'],
      message: ''
    }
  }

addItem(e) {
  e.preventDefault();
  const {buyItems} = this.state;
  const newItem = this.newItem.value
  const isOnTheList = buyItems.includes(newItem);

  if (isOnTheList) {
    this.setState({
      message: 'This item is already on the list.'
    })
  } else {
    newItem !== '' && this.setState({
      buyItems: [...this.state.buyItems, newItem],
        message: ''
    })
  }
  this.addForm.reset();
}

removeItem(item){
  const newBuyItems = this.state.buyItems.filter(buyItem => {
    return buyItem !== item;
  });

  this.setState({
    buyItems: [...newBuyItems]
  })

  if(newBuyItems.length === 0){
    this.setState({
      message: 'No items on your list, add some.'
    })
  }
}

clearAll(){

  this.setState({
    buyItems: [],
    message: 'No items on your list, add some.'
  })
}

  render() {
    // destructuring
    const {buyItems, message} = this.state
    return (
      <div className="container">
        <header>
          <h1>Shopping List</h1>
          <form ref={input => this.addForm = input} className="form-inline" onSubmit={(e) => {this.addItem(e)}}>
            <div className="form-group">
              <label className="sr-only" htmlFor="newItemInput">Add New Item</label>
              <input ref={input => this.newItem = input} type="text" placeholder="Bread" className="form-control" id="newInputItem" />
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        </header>
        <div className="content">
          {
            (message !== '' || buyItems.length === 0) && <p className="message text-danger">{message}</p>
          }
          {
          buyItems.length > 0 &&
          <table className="table">
            <caption>Shopping List</caption>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                buyItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index+1}</th>
                      <td>{item}</td>
                      <td className="text-right">
                        <button onClick={(e)=> this.removeItem(item)} type="button" className="btn btn-default btn-sm">Remove</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">&nbsp;</td>
                <td className="tex-right">
                  <button onClick={(e) => this.clearAll()} className="btn btn-default btn-sm">Clear list</button>
                </td>
              </tr>
            </tfoot>
          </table>
        }
        </div>
      </div>
    )
  }
}
