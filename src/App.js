import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Donation from './donation';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {page:1};
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(value){
        if (value === 'next'){
            let page = this.state.page +1 ;
            this.setState({page:page});
        }
        else{
            let page = this.state.page -1 ;
            page >= 1 && this.setState({page:page});
        }
    }

  render() {
    return (
      <div className="App">
       <Nav page={this.state.page}/>
       <UserInput onButtonClick={this.handleClick} page={this.state.page}/>
      </div>
    );
  }
}

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return(
        <div>
            <ul>
                <li className={this.props.page===1?'active':''}>Amount</li>
                <span>-</span>
                <li className={this.props.page===2?'active':''}>Your Info</li>
                <span>-</span>
                <li className={this.props.page===3?'active':''}>Payment</li>
            </ul>
        </div>
    );
  }
}

class UserInput extends React.Component {
  constructor(props){
    super(props);
    this.state = {option: '', name:'', email:''};
    this.handleOptionChange=this.handleOptionChange.bind(this);
    this.handleOtherAmount=this.handleOtherAmount.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleOptionChange(value){
      this.setState({option: value})
      this.props.onButtonClick('next');
  }

  handleOtherAmount(value){
      this.setState({option:value});
  }

  handlePageChange(e){
      let name = e.target.name;
      this.props.onButtonClick(name);
  }

  handleInfoChange(name, value){
      this.setState({[name]: value})
  }

  handleSubmit(e) {
      e.preventDefault();
  }

  render() {
      return(
          <div className="userInput">
              <div className="info">
                  {this.props.page === 1 &&
                  <FormAmount onRadioChange={this.handleOptionChange} onOtherAmountChange={this.handleOtherAmount} optionValue={this.state.option} />
                  }
                  {this.props.page === 2 &&
                  <UserInfo onInfoChange={this.handleInfoChange} />
                  }
                  {this.props.page === 3 &&
                  <Summary summary={this.state} onOptionChange={this.handleSubmit}/>
                  }
              </div>

              <div className="button-group">
                  <button name="pre" onClick={this.handlePageChange} hidden={this.props.page === 1}>Previous</button>
                  <button name="next" onClick={this.handlePageChange} hidden={this.props.page === 3}>Next</button>
                  <button name="next" onClick={this.handleSubmit} hidden={this.props.page < 3}>Confirm</button>
              </div>
          </div>

          )
  }
}

class FormAmount extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleOtherAmount = this.handleOtherAmount.bind(this);
  }

  handleOptionChange(e){
      this.props.onRadioChange(e.target.value);
  }

  handleOtherAmount(e){
      this.props.onOtherAmountChange(e.target.value)
  }

  render() {
    return(
        <div className="amount">
            <div className="btn-group" data-toggle="buttons">
                    <label className={"btn btn-primary" + (this.props.optionValue === '50'?' active':'')}>
                    <input id="donation_amount_50" type="checkbox" name="donation50" className="donation_amount_option" onChange={this.handleOptionChange} value="50" checked={this.props.optionValue === '50'}/>
                    $50
                    </label>
                    <label className={"btn btn-primary" + (this.props.optionValue === '100'?' active':'')}>
                    <input id="donation_amount_100" type="checkbox" name="donation100" className="donation_amount_option" onChange={this.handleOptionChange} value="100" checked={this.props.optionValue === '100'}/>
                    $100
                    </label>

                    <label className={"btn btn-primary" + (this.props.optionValue === '500'?' active':'')}>
                    <input id="donation_amount_500" type="checkbox" name="donation500" className="donation_amount_option" onChange={this.handleOptionChange} value="500" checked={this.props.optionValue === '500'}/>
                    $500</label>

                    <label className={"btn btn-primary"}>
                    Other Amount $
                    <input id="donation_amount_other" type="text" name="donation" ref="otherAmount" className="donation_amount_option" size="6" onChange={this.handleOtherAmount}/>
                    </label>

            </div>
        </div>
    );
  }
}

class UserInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleInfoChange = this.handleInfoChange.bind(this);
  }
  handleInfoChange(e){
      const target = e.target;
      const value = target.value;
      const name = target.name;
      this.props.onInfoChange(name, value)
  }
  render() {
    return(
        <div>
            <div className="form-group row">
                <label htmlFor="email-input" className="col-2 col-form-label">Email</label>
                <div className="col-8 col-offset-2">
                    <input className="form-control" name="email" type="email" id="email-input" onChange={this.handleInfoChange}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="name-input" className="col-2 col-form-label">Name</label>
                <div className="col-8 col-offset-2">
                    <input className="form-control" name="name" type="text" id="name-input" onChange={this.handleInfoChange} />
                </div>
            </div>
        </div>
    );
  }
}

class Summary extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return(
        <div>
            <p>Name: {this.props.summary.name}</p>
            <p>Email: {this.props.summary.email}</p>
            <p>Amount: {this.props.summary.option}</p>
        </div>
    );
  }
}

export default App;
