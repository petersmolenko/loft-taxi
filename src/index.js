import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./redux/configureStore";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./components/App.jsx";
import * as serviceWorker from "./serviceWorker";

const store = configureStore(
    localStorage.state
        ? JSON.parse(localStorage.state)
        : {
              auth: { isLoggedIn: false, error: null },
              profile: {
                  cardNumber: "0000 0000 0000 0000",
                  expiryDate: "12/20",
                  cardName: "Mark Kram",
                  cvc: "123",
                  error: null
              },
          }
);
store.subscribe(() => {
    localStorage.setItem("state", JSON.stringify(store.getState()));
});
store.subscribe(()=>console.log(store.getState()))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
