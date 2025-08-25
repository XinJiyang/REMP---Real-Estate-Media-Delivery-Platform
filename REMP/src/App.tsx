import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Edit from './Edit';
import PropertyDetailPopup from './components/EditPopupComponents/property-detail-popup';
import HeroMediaPopup from './components/EditPopupComponents/hero-media-popup';
import AgentProperty from './components/AgentPropertyComponents/my-property';
import AgentContactPopup from './components/AgentContactComponents/agent-contact-popup';
import SelectMediaPopup from './components/EditPopupComponents/select-media-popup';
import Preview from './Preview';
import AdminSignupPage from './components/DashboardComponents/admin-signup';
import PhotographyCompanySignupPage from './components/DashboardComponents/photography-company-signup';
import LoginPage from './components/login';
import Dashboard from './dashboard';
import Unauthorized from './components/Unauthorized';
import ProtectedRoute from './config/protected-route';
import { UserRole } from './interface/auth';
import PropertyHome from './Home';
import { Toaster } from './components/ui/toaster';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/property/:id" element={<PropertyHome />} />

            <Route path="/edit" element={<Edit />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/popup" element={<PropertyDetailPopup isOpen={true} onClose={function (): void {
              throw new Error('Function not implemented.');
            }} />} />
            <Route path="/HERO" element={<HeroMediaPopup isOpen={true} onClose={function (): void {
              throw new Error('Function not implemented.');
            }} />} />
            <Route path="/select-media" element={<SelectMediaPopup isOpen={true} onClose={function (): void {
              throw new Error('Function not implemented.');
            }} />} />
            <Route path="/agent-contact" element={<AgentContactPopup isOpen={true} onClose={function (): void {
              throw new Error('Function not implemented.');
            }} />} />
            <Route path="/admin-signup" element={<AdminSignupPage />} />
            <Route path="/photography-company-signup" element={<PhotographyCompanySignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRoles={['PhotographyCompany', 'Admin'] as UserRole[]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-property"
              element={
                <ProtectedRoute requiredRoles={['Agent'] as UserRole[]}>
                  <AgentProperty />
                </ProtectedRoute>
              }
            />

            <Route
              path="/listing-case"
              element={
                <ProtectedRoute requiredRoles={['PhotographyCompany', 'Admin'] as UserRole[]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/agents"
              element={
                <ProtectedRoute requiredRoles={['Admin'] as UserRole[]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/your-agents"
              element={
                <ProtectedRoute requiredRoles={['PhotographyCompany'] as UserRole[]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/photography-companies"
              element={
                <ProtectedRoute requiredRoles="Admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/property-edit/:id"
              element={
                <ProtectedRoute requiredRoles={['PhotographyCompany', 'Admin'] as UserRole[]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

export default App;