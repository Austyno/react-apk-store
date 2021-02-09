import {
	USER_AUTH_START,
	USER_AUTH_SUCCESS,
    USER_AUTH_FAIL,
    RESET
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_AUTH_START:
      return {
        loading: true,
      };
    case USER_AUTH_SUCCESS:
      return {
        userInfo: action.payload,
        success: true,
      };
    case USER_AUTH_FAIL:
      return {
        error: action.payload,
      };
    case RESET:
      return {};

    default:
      return state;
  }
};