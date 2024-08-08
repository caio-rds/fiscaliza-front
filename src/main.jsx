import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import "./index.css";
import { HomeTemplate } from "./templates/HomeTemplate/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <HomeTemplate>
      <App />
    </HomeTemplate>
  </ThemeContextProvider>
);
