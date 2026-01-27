import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tym from "./pages/Tym";
import Program from "./pages/Program";
import Uspechy from "./pages/Uspechy";
import UspechDetail from "./pages/UspechDetail";
import Zpravodaj from "./pages/Zpravodaj";
import Kontakt from "./pages/Kontakt";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tym" element={<Tym />} />
          <Route path="/program" element={<Program />} />
          <Route path="/uspechy" element={<Uspechy />} />
          <Route path="/uspechy/:id" element={<UspechDetail />} />
          <Route path="/zpravodaj" element={<Zpravodaj />} />
          <Route path="/kontakt" element={<Kontakt />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
