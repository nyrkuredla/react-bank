export const USER_SELECTED = "USER_SELECTED";
export const ACCOUNT_SELECTED = "ACCOUNT_SELECTED";
export const WITHDRAW_FUNDS = "WITHDRAW_FUNDS";
export const TOGGLE_MODAL = "TOGGLE_MODAL";

export function selectUser(userId) {
  return {
    type: USER_SELECTED,
    payload: userId
  };
}

export function selectAccount(accountId) {
  return {
    type: ACCOUNT_SELECTED,
    payload: accountId
  }
}

export function withdrawFunds(amount) {
  return {
    type: WITHDRAW_FUNDS,
    //need to change the amount to an integer value
    payload: parseInt(amount, 10)
  }
}

export function toggleModal() {
  return {
    type: TOGGLE_MODAL,
  }
}
