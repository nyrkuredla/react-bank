import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAccount, toggleModal }  from '../actions/index';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
//import router Link
import { Link } from 'react-router-dom';

import Transaction from './Transaction'



class AccountDetail extends Component {

  render() {
    if(!this.props.account) {
      return (
        <div>Please select an account...</div>
      )
    }
    const account = this.props.account
    console.log(this.props)

    return (
      <div className="col-md-6">
        <div className= "card">
          <div className= "card-block">
            <h4 className= "card-title">{this.props.user.name}'s Account Information</h4>
            <h6 className= "card-subtitle mb-2 text-muted">{account.accountType} Account</h6>
            <div className= "card-text">
              <div>Balance: ${account.balance}</div>
              <Transaction show={this.props.isOpen} />
              <button className="btn btn-primary" onClick={() => this.props.toggleModal()}>Withdrawal</button>
            </div>
          </div>
          <Link className="btn btn-primary" to="/users" >Back to List of Users</Link>
        </div>


      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.selectedUser,
    account: state.selectedAccount,
    isOpen: state.isOpen
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectAccount: selectAccount,
    toggleModal: toggleModal
  }, dispatch)
}



export default connect(mapStateToProps,  mapDispatchToProps)(AccountDetail);
