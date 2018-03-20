exports.onRouteUpdate = ({ location }) => {
  if (
    typeof window !== 'undefined' &&
    window.hippoUser
  ) {
    ++window.hippoUser.interactions; // increment interaction count
    if (window.hippoUser.selection == 'Advertisement') {
      window.hippoUser.adsSeen = window.hippoUser.adsSeen + 2; // increment number of ads seen
    }
  }
};
