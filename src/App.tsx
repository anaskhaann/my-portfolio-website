import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/index";
import { LenisProvider } from "@/providers/LenisProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <LenisProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Index />
        </TooltipProvider>
      </QueryClientProvider>
    </LenisProvider>
  </ThemeProvider>
);

export default App;
