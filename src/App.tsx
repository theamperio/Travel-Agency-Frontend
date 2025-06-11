// App.tsx
import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Main_loader } from './components/mainloader/main_loader';
import HomeLayout from './layout/homelayout';
import LandingPage from './pages/landingpage';
import Services from './pages/services/services';
import ScrollIndicator from './components/motionFramer/ScrollIndicator';
import AboutUsPage from './pages/about/aboutpage';
import ContactPage from './pages/contact/contact';

// Add lazy loading for PackageDetails
const PackageDetails = lazy(() => import('./pages/packageDetails/packageDetails'));

function App() {
  return (
    <Suspense fallback={<Main_loader />}>
      <ScrollIndicator />
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<LandingPage/> } />
          <Route path="/packages" element={<Services/> } />
          <Route path="/package-info/:id" element={<PackageDetails/> } />
          <Route path="/about" element={<AboutUsPage/> } />
          <Route path="/contact" element={<ContactPage/> } />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
