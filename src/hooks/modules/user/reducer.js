import produce from 'immer';

const INITIAL_STATE = {
   profile: null,
   session: 0,
};

export default function user(state = INITIAL_STATE, action) {
   return produce(state, draft => {
      switch (action.type) {
         case '@auth/SIGN_IN_SUCCESS': {
            draft.profile = action.payload.user;
            break;
         }
         case '@user/USER_SESSION': {
            draft.session = action.payload.session;
            break;
         }
         case '@user/UPDATE_PROFILE_SUCCESS': {
            draft.profile = action.payload.profile;
            break;
         }
         case '@auth/SIGN_OUT': {
            draft.profile = null;
            draft.session = 0;
            break;
         }
         default:
      }
   });
}
