/* eslint-disable func-names */
if (process.env.NODE_ENV === 'production') {
   window.onbeforeunload = function() {
      window.location.reload(true);
      localStorage.clear();
      return 'PortalBI!';
   };
}
