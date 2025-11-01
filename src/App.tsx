import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Issue 1 & 2: Renamed
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Education from "./pages/Education";
import Skills from "./pages/Skills";
import SkillSelected from "./pages/SkillSelected";
import NotFound from "./pages/NotFound";
import Lessons from "./pages/Lessons";
import Introduction from "./pages/Introduction";
import Listening from "./pages/Listening";
import Reading from "./pages/Reading";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster /> {/* Issue 3 & 4: Used the unique component name */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/education" element={<Education />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/skills/:skillName/start" element={<SkillSelected />} />
          <Route path="/skills/:skillName" element={<SkillSelected />} />
          <Route path="/lessons/:skillName" element={<Lessons />} />
          <Route path="/lessons/:skillName/introduction" element={<Introduction />} />
          <Route path="/lessons/:skillName/listening" element={<Listening />} />
          <Route path="/lessons/:skillName/reading" element={<Reading />} />



          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;