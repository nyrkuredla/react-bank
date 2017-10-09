import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectAccount, toggleModal, withdrawFunds }  from '../actions/index';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
//import router Link
import { Link } from 'react-router-dom';




class Transaction extends Component {

  render() {
    const account = this.props.account
    console.log(this.props)

    return (
      <div className="col-md-6">
        <div className= "card">
          <div className= "card-block">
            <h4 className= "card-title">Quick Cash</h4>
            <h6 className= "card-subtitle mb-2 text-muted">{account.accountType} Account</h6>
            <div className= "card-text">
              {/* <Transaction /> */}
              <button className="btn btn-danger" onClick={() => this.props.withdrawFunds(10)}>Withdraw $10 Now</button>
              <button className="btn btn-danger" onClick={() => this.props.withdrawFunds(20)}>Withdraw $20 Now</button>
              <button className="btn btn-danger" onClick={() => this.props.withdrawFunds(100)}>Withdraw $100 Now</button>
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
    account: state.selectedAccount
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectAccount: selectAccount,
    toggleModal: toggleModal,
    withdrawFunds: withdrawFunds
  }, dispatch)
}



export default connect(mapStateToProps,  mapDispatchToProps)(Transaction);
