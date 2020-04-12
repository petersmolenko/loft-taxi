import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import "./index.css";
import App from "./components/App.jsx";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider} from "./AuthContext.jsx";

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
