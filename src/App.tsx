import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/index";
import { LenisProvider } from "@/providers/LenisProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

/**
 * The root component of the application.
 * It sets up the global context providers, including theme, smooth scrolling, and tooltips.
 * It also renders the main page content and toast notification systems.
 */
const App = () => (
  <ThemeProvider>
    <LenisProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Index />
      </TooltipProvider>
    </LenisProvider>
  </ThemeProvider>
);

export default App;
