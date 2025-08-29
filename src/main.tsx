import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

/**
 * The entry point of the React application.
 * It renders the root `App` component into the DOM.
 */
createRoot(document.getElementById("root")!).render(<App />);
