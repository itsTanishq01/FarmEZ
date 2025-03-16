
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Chatbot from "./pages/Chatbot";
import SoilAnalysis from "./pages/SoilAnalysis";
import DiseaseDetection from "./pages/DiseaseDetection";

// Import the new settings components
import SettingsLayout from "./pages/settings/SettingsLayout";
import AccountSettings from "./pages/settings/AccountSettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import LoginHistorySettings from "./pages/settings/LoginHistorySettings";
import AboutAppSettings from "./pages/settings/AboutAppSettings";
import TermsSettings from "./pages/settings/TermsSettings";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <AppLayout>
                    <Index />
                  </AppLayout>
                } 
              />
              <Route 
                path="/login" 
                element={
                  <AppLayout>
                    <Login />
                  </AppLayout>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <AppLayout>
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  </AppLayout>
                } 
              />
              
              {/* Settings Routes */}
              <Route 
                path="/settings" 
                element={
                  <AppLayout>
                    <ProtectedRoute>
                      <SettingsLayout />
                    </ProtectedRoute>
                  </AppLayout>
                }
              >
                <Route path="account" element={<AccountSettings />} />
                <Route path="notifications" element={<NotificationSettings />} />
                <Route path="about" element={<AboutAppSettings />} />
                <Route path="terms" element={<TermsSettings />} />
              </Route>
              
              <Route 
                path="/about" 
                element={
                  <AppLayout>
                    <AboutUs />
                  </AppLayout>
                } 
              />
              <Route 
                path="/chatbot" 
                element={
                  <AppLayout>
                    <ProtectedRoute>
                      <Chatbot />
                    </ProtectedRoute>
                  </AppLayout>
                } 
              />
              <Route 
                path="/soil-analysis" 
                element={
                  <AppLayout>
                    <ProtectedRoute>
                      <SoilAnalysis />
                    </ProtectedRoute>
                  </AppLayout>
                } 
              />
              <Route 
                path="/disease-detection" 
                element={
                  <AppLayout>
                    <ProtectedRoute>
                      <DiseaseDetection />
                    </ProtectedRoute>
                  </AppLayout>
                } 
              />
              <Route 
                path="*" 
                element={
                  <AppLayout>
                    <NotFound />
                  </AppLayout>
                } 
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
