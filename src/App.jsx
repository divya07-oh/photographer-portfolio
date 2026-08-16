import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetails from './pages/ProjectDetails';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Management
import ProtectedRoute from './components/manage/ProtectedRoute';
import ManagementLayout from './components/manage/ManagementLayout';
import Dashboard from './pages/manage/Dashboard';
import Projects from './pages/manage/Projects';
import AddProject from './pages/manage/AddProject';
import EditProject from './pages/manage/EditProject';
import AdminLogin from './pages/AdminLogin';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:projectId" element={<ProjectDetails />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        
        {/* Management Routes */}
        <Route path="/manage" element={
          <ProtectedRoute>
            <ManagementLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<AddProject />} />
          <Route path="projects/:id/edit" element={<EditProject />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
