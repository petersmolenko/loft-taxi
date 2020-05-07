import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer, { rootSaga } from "./modules";

const createAppStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const initialState = localStorage.state
        ? JSON.parse(localStorage.state)
        : {
              auth: { isLoggedIn: false, error: null },
              profile: {
                  paymentInfo: null,
                  isLoaded: false,
              },
              routes: {
                  addresses: [],
                  route: null,
              },
          };

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : (noop) => noop
        )
    );
    
    store.subscribe(() => {
        localStorage.setItem("state", JSON.stringify(store.getState()));
    });

    sagaMiddleware.run(rootSaga);

    return store;
};

export default createAppStore;
