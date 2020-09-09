export function updateProfileRequest(data) {
   return {
      type: '@user/UPDATE_PROFILE_REQUEST',
      payload: { data },
   };
}

export function updateProfileSuccess(profile) {
   return {
      type: '@user/UPDATE_PROFILE_SUCCESS',
      payload: { profile },
   };
}

export function updateProfileFailure() {
   return {
      type: '@user/UPDATE_PROFILE_FAILURE',
   };
}

export function userSession(session) {
   return {
      type: '@user/USER_SESSION',
      payload: { session },
   };
}
