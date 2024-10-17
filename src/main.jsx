import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import AuthContext from "./Context/AuthsContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContext>
    <App />
  </AuthContext>
);
