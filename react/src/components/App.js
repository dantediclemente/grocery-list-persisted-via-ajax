// App.js
import React, { Component } from 'react';
import GroceryForm from './GroceryForm';
import GroceryList from './GroceryList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groceries: [],
      name: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();

    $.ajax({
      url: '/api/groceries',
      contentType: 'application/json',
      method: "POST",
      data: JSON.stringify({
        grocery: {
          name: this.state.name
        }
      })
    }).done(data => {
      let newGrocery = data.grocery;
      let newGroceries = [...this.state.groceries, newGrocery];
      this.setState({
        groceries: newGroceries,
        name: ''
      });
    })
  }

  handleButtonClick(id) {
    let newGroceries = this.state.groceries.filter(grocery => {
      return grocery.id !== id;
    });
    $.ajax({
      url: '/api/groceries/' + id,
      contentType: 'application/json',
      method: "DELETE"
    })
    .done(() => {
      this.setState({ groceries: newGroceries });
    })
  }

  handleChange(event) {
    let newName = event.target.value;
    this.setState({ name: newName });
  }

  componentDidMount() {
    $.ajax({
      url: '/api/groceries',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({ groceries: data.groceries });
    });
  }

  render() {
    return(
      <div className="small-4 small-centered columns app">
        <h1 className="text-center">Grocery List React</h1>
        <GroceryForm
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
          name={this.state.name}
        />
        <GroceryList
          groceries={this.state.groceries}
          handleButtonClick={this.handleButtonClick}
        />
      </div>
    );
  }
}

export default App;
