import {combineReducers} from 'redux';
import {USER_SELECTED, ACCOUNT_SELECTED, WITHDRAW_FUNDS} from '../actions/index';
import userList from '../data/users';
import update from 'immutability-helper';

const initialState = {
    users: userList(),
    selectedUser: null,
    selectedAccount: null
}

const reducer = function(state = initialState, action) {
    switch (action.type) {
        case USER_SELECTED:
        console.log('user payload', action.payload)
            let selectedUser = state.users.filter((userInfo) => {
              if(userInfo._id === action.payload) {
                return true
                  }
                })
              return update(state, {
                selectedUser: {
                  $set: selectedUser
                }
              })


        case ACCOUNT_SELECTED:
        console.log('payload', action.payload)
        console.log('state selected user', state.selectedUser)
        let accounts = state.selectedUser[0].accounts;
        let selectedAccount = accounts.filter((account) => {
          if(account.id === action.payload) {
            return true
          }
          else {
            console.log('nope, no acct selected')
          }
        })
          return update(state, {
            selectedAccount: {
              $set: selectedAccount
            }
          })

        case WITHDRAW_FUNDS:
            const userIdx = state.users.findIndex(user => user._id === state.selectedUser);
            const accountIdx = state.users[userIdx].accounts.findIndex(account => account.id === state.selectedAccount);

            return update(state, {
                users: {
                    [userIdx]: {
                        accounts: {
                            [accountIdx]: {
                                balance: {
                                    $apply: function(balance) {
                                        return balance - action.payload
                                    }
                                }
                            }
                        }
                    }
                }
            })
        default:
            return state;
    }
}

export default reducer;
