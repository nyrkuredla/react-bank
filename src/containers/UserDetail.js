import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUser, selectAccount }  from '../actions/index';
//make sure action created flows through all reducers
import { bindActionCreators } from 'redux';
//import router Link
import { Link } from 'react-router-dom';



class UserDetail extends Component {

  render() {
    console.log('user props', this.props)
    if(!this.props.user) {
      return (
        <div>Please select a user...</div>
      )
    }
    //get user id from params of URL
    const { id } = this.props.match.params;
    let user = this.props.user[0]
    //map over the accounts for the user to create links to them.
    let accounts = this.props.user[0].accounts.map(account => {
      console.log('account ids', account.id)

      //creating a Link with the account type for
      //each account.
      return (
        <div key={account.id}>
          <Link
            onClick={() => this.props.selectAccount(account.id)}
            to={`/users/${id}/${account.id}`}>{account.accountType}</Link>
        </div>

      )
    })
    return (
      <div className="col-md-6">
        <div className= "card">
          <div className= "card-block">
            <h4 className= "card-title">Account Information</h4>
            <h6 className= "card-subtitle mb-2 text-muted">{user.name}</h6>
            <div className= "card-text">
              <div>{user.email}</div>
              <div>{user.phone}</div>
              <div>{user.address}</div>

            </div>
            {accounts}
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
    selectAccount: selectAccount
  }, dispatch)
}



export default connect(mapStateToProps,  mapDispatchToProps)(UserDetail);
