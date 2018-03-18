exports.onRouteUpdate = ({ location }) => {
  if (
    typeof window !== 'undefined' &&
    window.hippoUser &&
    window.hippoUser.selection == 'Advertisement'
  ) {
    ++window.hippoUser.interactions; // number of pages visited
    window.hippoUser.adsSeen = window.hippoUser.adsSeen + 2; // number of ads seen
  }
};
