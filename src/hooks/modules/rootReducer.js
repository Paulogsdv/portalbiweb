import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import setting from './setting/reducer';

export default combineReducers({
   auth,
   user,
   setting,
});
