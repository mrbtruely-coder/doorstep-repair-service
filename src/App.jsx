import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookServicePage from './pages/BookServicePage';
import LocationPage from './pages/LocationPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import PolicyPage from './pages/PolicyPage';

export default function App() {
  const getPageFromPathOrHash = () => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    const target = path || hash;
    if (target.includes('service-center') || target.includes('location')) return 'location';
    if (target.includes('book')) return 'book';
    if (target.includes('service')) return 'services';
    if (target.includes('about')) return 'about';
    if (target.includes('faq')) return 'faq';
    if (target.includes('contact')) return 'contact';
    if (target.includes('term')) return 'terms';
    if (target.includes('policy')) return 'policy';
    return 'home';
  };

  const [activePage, setActivePage] = useState(getPageFromPathOrHash);
  const [selectedService, setSelectedService] = useState('AC SERVICE');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCity, setSelectedCity] = useState(() => {
    const p = (window.location.pathname + window.location.hash).toLowerCase();
    if (p.includes('guntur')) return 'guntur';
    if (p.includes('nellore')) return 'nellore';
    return 'vijayawada';
  });

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getPageFromPathOrHash());
      const p = (window.location.pathname + window.location.hash).toLowerCase();
      if (p.includes('guntur')) setSelectedCity('guntur');
      else if (p.includes('nellore')) setSelectedCity('nellore');
      else if (p.includes('vijayawada')) setSelectedCity('vijayawada');
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (pageId, param = null) => {
    setActivePage(pageId);
    let url = '/';
    if (pageId === 'services') {
      if (param !== null) setSelectedCategory(param);
      url = param ? `/services/${param}` : '/services';
    } else if (pageId === 'location') {
      const city = (param !== null ? param : selectedCity || 'vijayawada').toLowerCase();
      setSelectedCity(city);
      url = `/service-center/${city}`;
    } else if (pageId === 'book') {
      if (param !== null) setSelectedService(param);
      url = '/book';
    } else if (pageId !== 'home') {
      url = `/${pageId}`;
    }
    window.history.pushState(null, '', url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            setActivePage={navigateTo}
            setSelectedService={setSelectedService}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 'services':
        return (
          <ServicesPage
            setActivePage={navigateTo}
            setSelectedService={setSelectedService}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 'location':
        return (
          <LocationPage
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            setActivePage={navigateTo}
            setSelectedService={setSelectedService}
          />
        );
      case 'book':
        return (
          <BookServicePage
            preselectedService={selectedService}
            preselectedCity={selectedCity}
          />
        );
      case 'about':
        return <AboutPage setActivePage={navigateTo} />;
      case 'faq':
        return <FAQPage setActivePage={navigateTo} />;
      case 'contact':
        return <ContactPage />;
      case 'terms':
        return <TermsPage />;
      case 'policy':
        return <PolicyPage />;
      default:
        return (
          <HomePage
            setActivePage={navigateTo}
            setSelectedService={setSelectedService}
          />
        );
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Universal Header with top bar, logo, and active page controls */}
      <Header activePage={activePage} setActivePage={navigateTo} />

      {/* Main Page Body */}
      <main style={{ flex: 1 }}>
        {renderCurrentPage()}
      </main>

      {/* Universal Footer with service links, cities, and policies */}
      <Footer setActivePage={navigateTo} />

      {/* Floating Buttons: WhatsApp, Call 9515661677, and Up Direction Move to Top */}
      <FloatingActions />
    </div>
  );
}
