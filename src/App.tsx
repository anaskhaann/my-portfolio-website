import Index from "./pages/index";
import { LenisProvider } from "@/providers/LenisProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

/**
 * The root component of the application.
 * It sets up the global context providers for theme and smooth scrolling,
 * then renders the main page content.
 */
const App = () => (
  <ThemeProvider>
    <LenisProvider>
      <Index />
    </LenisProvider>
  </ThemeProvider>
);

export default App;
