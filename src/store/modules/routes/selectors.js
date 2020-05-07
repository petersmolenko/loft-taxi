const getAddresses = state =>  state.routes.addresses;
const getRoute = state => state.routes.route;
const routeIsLoaded = state => state.routes.isLoaded;

export {getAddresses, getRoute, routeIsLoaded}