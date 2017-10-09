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
          const userIndex = state.users.findIndex((user) => user._id === action.payload);
          let selectedUser = state.users[userIndex];
          console.log(selectedUser)
              return update(state, {
                selectedUser: {
                  $set: selectedUser
                }
              })


        case ACCOUNT_SELECTED:
        let accounts = state.selectedUser.accounts;
        let accountIndex = accounts.findIndex((account) => account.id === action.payload);
        let selectedAccount = accounts[accountIndex]
          return update(state, {
            selectedAccount: {
              $set: selectedAccount
            }
          })

        case WITHDRAW_FUNDS:
        let acctBalance = state.selectedAccount.balance;
        let newBalance = (acctBalance - action.payload);
        return update(state, {
          selectedAccount: {
            balance: {
              $set: newBalance
            }
          }
        })

        default:
            return state;
    }
}

export default reducer;
