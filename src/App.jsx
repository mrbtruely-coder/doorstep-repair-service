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

import { CITIES, SERVICE_CATEGORIES } from './constants/data';
import { 
  areaToSlug, 
  findAreaFromSlug, 
  findCategoryFromSlug, 
  findSubcategoryFromSlug,
  subCategoryToSlug
} from './utils/slugUtils';

export default function App() {
  const getPageFromPathOrHash = () => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    const target = path || hash;
    const parts = target.split('/').filter(Boolean);

    // If 'book' is in parts or ends with /book or is 'book', this is the booking page!
    if (parts.includes('book') || target.endsWith('/book') || target === 'book') {
      return 'book';
    }

    // /service-center/:city/:subarea routes to service category page
    if ((parts[0] === 'service-center' || parts[0] === 'location') && parts[1] && parts[2]) {
      return 'services';
    }

    if (target.includes('service-center') || target.includes('location')) return 'location';
    if (target.includes('service')) return 'services';
    if (target.includes('about')) return 'about';
    if (target.includes('faq')) return 'faq';
    if (target.includes('contact')) return 'contact';
    if (target.includes('term')) return 'terms';
    if (target.includes('policy')) return 'policy';
    return 'home';
  };

  const getCategoryFromPath = () => {
    const p = window.location.pathname.toLowerCase();
    const parts = p.split('/').filter(Boolean);
    if (parts[0] === 'services' && parts[1]) {
      if (parts[1] === 'book') return null;
      return findCategoryFromSlug(parts[1], SERVICE_CATEGORIES);
    }
    if ((parts[0] === 'service-center' || parts[0] === 'location') && parts[3]) {
      if (parts[3] === 'book') return null;
      return findCategoryFromSlug(parts[3], SERVICE_CATEGORIES);
    }
    return null;
  };

  const getSubcategoryFromPath = () => {
    const p = window.location.pathname.toLowerCase();
    const parts = p.split('/').filter(Boolean);

    // 1. Direct services routing: /services/:cat/:subcat or /services/:cat/:subcat/book
    if (parts[0] === 'services' && parts[1] && parts[2]) {
      if (parts[2] === 'book') return null;
      const catId = findCategoryFromSlug(parts[1], SERVICE_CATEGORIES);
      const catObj = SERVICE_CATEGORIES.find((c) => c.id === catId);
      if (catObj && catObj.subcategories) {
        const found = findSubcategoryFromSlug(parts[2], catObj.subcategories);
        if (found) return found;
      }
      return parts[2];
    }

    // 2. Hub-area routing: /service-center/:city/:subarea/:cat/:subcat or .../book
    if ((parts[0] === 'service-center' || parts[0] === 'location') && parts[3] && parts[4]) {
      if (parts[4] === 'book') return null;
      const catId = findCategoryFromSlug(parts[3], SERVICE_CATEGORIES);
      const catObj = SERVICE_CATEGORIES.find((c) => c.id === catId);
      if (catObj && catObj.subcategories) {
        const found = findSubcategoryFromSlug(parts[4], catObj.subcategories);
        if (found) return found;
      }
      return parts[4];
    }
    return null;
  };

  const getCityFromPath = () => {
    if (typeof window === 'undefined') return 'vijayawada';
    const parts = window.location.pathname.toLowerCase().split('/').filter(Boolean);
    if (parts[0] === 'service-center' || parts[0] === 'location') {
      if (parts[1]) {
        const found = CITIES.find((c) => c.id.toLowerCase() === parts[1]);
        if (found) return found.id;
      }
      return 'all';
    }
    const p = (window.location.pathname + window.location.hash).toLowerCase();
    const found = CITIES.find((c) => p.includes(c.id.toLowerCase()));
    if (found) return found.id;
    return 'vijayawada';
  };

  const getSubLocationFromURL = () => {
    if (typeof window === 'undefined') return null;

    // 1. Check path format: /service-center/:city/:subarea
    const path = window.location.pathname.toLowerCase();
    const parts = path.split('/').filter(Boolean);
    if ((parts[0] === 'service-center' || parts[0] === 'location') && parts[1] && parts[2]) {
      const cityId = parts[1];
      const subSlug = parts[2];
      const cityObj = CITIES.find((c) => c.id.toLowerCase() === cityId);
      if (cityObj && cityObj.keyColonies) {
        const found = findAreaFromSlug(subSlug, cityObj.keyColonies);
        if (found) return found;
      }
      return decodeURIComponent(subSlug).replace(/-/g, ' ');
    }

    // 2. Fallback to query params: ?area=...
    const params = new URLSearchParams(window.location.search);
    return params.get('area') || params.get('locality') || params.get('subLocation') || null;
  };

  const [activePage, setActivePage] = useState(getPageFromPathOrHash);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(getCategoryFromPath);
  const [selectedSubcategory, setSelectedSubcategory] = useState(getSubcategoryFromPath);
  const [selectedSubLocation, setSelectedSubLocation] = useState(getSubLocationFromURL);
  const [selectedCity, setSelectedCity] = useState(getCityFromPath);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(getPageFromPathOrHash());
      setSelectedCategory(getCategoryFromPath());
      setSelectedSubcategory(getSubcategoryFromPath());
      setSelectedCity(getCityFromPath());
      setSelectedSubLocation(getSubLocationFromURL());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (pageId, param = null, subLocation = null, subCategory = null, category = null) => {
    setActivePage(pageId);
    if (subLocation !== null) {
      setSelectedSubLocation(subLocation);
    }

    let url = '/';
    if (pageId === 'services') {
      setSelectedCategory(param);
      setSelectedSubcategory(subCategory);

      const currentCity = (selectedCity && selectedCity !== 'all') ? selectedCity : 'vijayawada';
      const effectiveSubLocation = subLocation !== null ? subLocation : selectedSubLocation;
      if (effectiveSubLocation) {
        const areaSlug = areaToSlug(effectiveSubLocation);
        if (param) {
          let subSlug = subCategory;
          const catObj = SERVICE_CATEGORIES.find((c) => c.id === param);
          if (!subSlug) {
            if (catObj && catObj.subcategories && catObj.subcategories.length > 0) {
              subSlug = areaToSlug(catObj.subcategories[0].name) || catObj.subcategories[0].id;
              setSelectedSubcategory(subSlug);
            }
          } else {
            const foundSub = catObj?.subcategories?.find(s => 
              s.id === subCategory || 
              s.name.toLowerCase() === subCategory.toLowerCase() ||
              areaToSlug(s.name) === subCategory
            );
            if (foundSub) subSlug = areaToSlug(foundSub.name) || foundSub.id;
          }
          url = subSlug 
            ? `/service-center/${currentCity}/${areaSlug}/${param}/${subSlug}`
            : `/service-center/${currentCity}/${areaSlug}/${param}`;
        } else {
          setSelectedSubcategory(null);
          url = `/service-center/${currentCity}/${areaSlug}`;
        }
      } else {
        if (param) {
          let subSlug = null;
          if (subCategory) {
            const catObj = SERVICE_CATEGORIES.find((c) => c.id === param);
            const foundSub = catObj?.subcategories?.find(s => 
              s.id === subCategory || 
              s.name.toLowerCase() === subCategory.toLowerCase() ||
              areaToSlug(s.name) === subCategory
            );
            subSlug = foundSub ? (areaToSlug(foundSub.name) || foundSub.id) : areaToSlug(subCategory);
          }
          url = subSlug ? `/services/${param}/${subSlug}` : `/services/${param}`;
        } else {
          url = '/services';
        }
      }
    } else if (pageId === 'location') {
      const city = (param !== null ? param : 'all').toLowerCase();
      setSelectedCity(city);
      setSelectedSubcategory(null);
      if (city === 'all') {
        url = '/service-center';
      } else if (subLocation) {
        url = `/service-center/${city}/${areaToSlug(subLocation)}`;
      } else {
        url = `/service-center/${city}`;
      }
    } else if (pageId === 'book') {
      if (param !== null) {
        setSelectedService(param);
      } else if (category === null && subCategory === null) {
        setSelectedService(null);
        setSelectedCategory(null);
        setSelectedSubcategory(null);
      }
      const effectiveSubLoc = subLocation !== null ? subLocation : selectedSubLocation;
      const targetCategory = category !== null ? category : (param ? selectedCategory : null);
      const targetSubcategory = subCategory !== null ? subCategory : (param ? selectedSubcategory : null);
      const currentCity = (selectedCity && selectedCity !== 'all') ? selectedCity : 'vijayawada';

      // Resolve category and subcategory slugs
      let catSlug = targetCategory;
      let subCatSlug = null;

      const catObj = SERVICE_CATEGORIES.find(c => c.id === catSlug);
      if (catObj && targetSubcategory) {
        const match = catObj.subcategories?.find(s => 
          s.id === targetSubcategory || 
          s.name.toLowerCase() === targetSubcategory.toLowerCase() ||
          areaToSlug(s.name) === targetSubcategory
        );
        if (match) {
          subCatSlug = areaToSlug(match.name) || match.id;
        } else {
          subCatSlug = areaToSlug(targetSubcategory);
        }
      }

      if (!catSlug || !subCatSlug) {
        for (const cat of SERVICE_CATEGORIES) {
          const matchSub = cat.subcategories?.find(s => 
            s.id === param || 
            s.name.toLowerCase() === (param || '').toLowerCase() ||
            areaToSlug(s.name) === (param || '').toLowerCase() ||
            (param && s.name.toLowerCase().includes(param.toLowerCase()))
          );
          if (matchSub) {
            if (!catSlug) catSlug = cat.id;
            if (!subCatSlug) subCatSlug = areaToSlug(matchSub.name) || matchSub.id;
            break;
          }
        }
      }

      if (catSlug) setSelectedCategory(catSlug);
      if (subCatSlug) setSelectedSubcategory(subCatSlug);

      if (effectiveSubLoc && currentCity) {
        const areaSlug = areaToSlug(effectiveSubLoc);
        if (catSlug && subCatSlug) {
          url = `/service-center/${currentCity}/${areaSlug}/${catSlug}/${subCatSlug}/book`;
        } else if (catSlug) {
          url = `/service-center/${currentCity}/${areaSlug}/${catSlug}/book`;
        } else {
          url = `/service-center/${currentCity}/${areaSlug}/book`;
        }
      } else {
        if (catSlug && subCatSlug) {
          url = `/services/${catSlug}/${subCatSlug}/book`;
        } else if (catSlug) {
          url = `/services/${catSlug}/book`;
        } else {
          url = '/book';
        }
        if (effectiveSubLoc) {
          url += `?area=${encodeURIComponent(effectiveSubLoc)}`;
        }
      }
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
            setSelectedCategory={(catId) => navigateTo('services', catId)}
          />
        );
      case 'services':
        return (
          <ServicesPage
            setActivePage={navigateTo}
            setSelectedService={setSelectedService}
            selectedCategory={selectedCategory}
            setSelectedCategory={(catId, subId = null) => navigateTo('services', catId, selectedSubLocation, subId)}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={(subId) => navigateTo('services', selectedCategory, selectedSubLocation, subId)}
            selectedSubLocation={selectedSubLocation}
            setSelectedSubLocation={setSelectedSubLocation}
            selectedCity={selectedCity}
          />
        );
      case 'location':
        return (
          <LocationPage
            selectedCity={selectedCity}
            setSelectedCity={(cityId) => navigateTo('location', cityId)}
            setActivePage={navigateTo}
            setSelectedService={setSelectedService}
            selectedSubLocation={selectedSubLocation}
            setSelectedSubLocation={setSelectedSubLocation}
          />
        );
      case 'book':
        return (
          <BookServicePage
            preselectedService={selectedService}
            preselectedCity={selectedCity}
            preselectedLocality={selectedSubLocation}
            preselectedCategory={selectedCategory}
            preselectedSubcategory={selectedSubcategory}
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
