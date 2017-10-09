import {combineReducers} from 'redux';
import {USER_SELECTED, ACCOUNT_SELECTED, WITHDRAW_FUNDS, TOGGLE_MODAL } from '../actions/index';
import userList from '../data/users';
import update from 'immutability-helper';

const initialState = {
    users: userList(),
    selectedUser: null,
    selectedAccount: null,
    isOpen: false
}

const reducer = function(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MODAL:
        let toggled = !state.isOpen;
        console.log("err day I'm togglin ", toggled)
          return update(state, {
            isOpen: {
              $set: toggled
            }
          })

        case USER_SELECTED:
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
