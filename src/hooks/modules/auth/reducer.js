import produce from 'immer';

const INITIAL_STATE = {
   token: null,
   refreshToken: null,
   signed: false,
   loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
   return produce(state, draft => {
      switch (action.type) {
         case '@auth/SIGN_IN_REQUEST': {
            draft.loading = true;
            break;
         }

         case '@auth/SIGN_IN_SUCCESS': {
            draft.token = action.payload.token;
            draft.refreshToken = action.payload.refreshToken;
            draft.signed = true;
            draft.loading = false;
            break;
         }

         case '@auth/SUCCESS_TOKEN': {
            draft.token = action.payload.token;
            break;
         }

         case '@auth/SIGN_FAILURE': {
            draft.loading = false;
            break;
         }

         case '@auth/SIGN_OUT': {
            draft.token = null;
            draft.refreshToken = null;
            draft.signed = false;
            draft.loading = false;
            break;
         }

         default:
      }
   });
}
