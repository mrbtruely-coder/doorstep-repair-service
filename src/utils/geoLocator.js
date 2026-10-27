import { CITIES } from '../constants/data';

/**
 * Enhanced High-Accuracy Geolocation + Reverse Geocoding
 * Uses HTML5 Geolocation with maximumAccuracy, zero cache age, 
 * Nominatim zoom=18 building/street resolution, and BigDataCloud fallback.
 */
export async function detectUserLocation() {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser.');
  }

  // 1. Force fresh, real-time high-accuracy satellite/Wi-Fi position (maximumAge: 0)
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      (err) => {
        let msg = 'Unable to retrieve your location.';
        if (err.code === 1) {
          msg = 'Location permission denied in browser. Please allow location access or type manually.';
        } else if (err.code === 2) {
          msg = 'GPS signal unavailable. Please type your colony manually.';
        } else if (err.code === 3) {
          msg = 'GPS request timed out. Please type your colony manually.';
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0 // Do not use stale cached coordinates
      }
    );
  });

  const { latitude, longitude, accuracy } = position.coords;

  // 2. Reverse geocode with building/street resolution (zoom=18)
  let rawData = null;
  let source = '';

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    );
    if (res.ok) {
      rawData = await res.json();
      source = 'nominatim';
    }
  } catch {
    // fallback
  }

  if (!rawData) {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      if (res.ok) {
        rawData = await res.json();
        source = 'bigdatacloud';
      }
    } catch {
      // both failed
    }
  }

  if (!rawData) {
    throw new Error('Unable to resolve address from coordinates. Please type your colony manually.');
  }

  let exactColony = '';
  let detectedCity = '';
  let detectedState = '';
  let detectedPostcode = '';
  let fullAddress = '';

  if (source === 'nominatim') {
    const addr = rawData.address || {};
    
    // Extract granular address components
    const road = addr.road || addr.pedestrian || addr.street || '';
    const neighbourhood = addr.neighbourhood || addr.residential || '';
    const suburb = addr.suburb || addr.village || addr.quarter || addr.subdistrict || '';
    
    // Combine road and colony/neighbourhood/suburb for maximum exactness
    const areaParts = [];
    if (road) areaParts.push(road);
    if (neighbourhood && !areaParts.includes(neighbourhood)) areaParts.push(neighbourhood);
    if (suburb && !areaParts.includes(suburb)) areaParts.push(suburb);
    if (areaParts.length === 0) {
      if (addr.city_district) areaParts.push(addr.city_district);
      else if (addr.county) areaParts.push(addr.county);
    }

    exactColony = areaParts.join(', ') || 'Residential Area';
    detectedCity = addr.city || addr.town || addr.county || addr.state_district || '';
    detectedState = addr.state || '';
    detectedPostcode = addr.postcode || '';
    fullAddress = rawData.display_name || '';
  } else {
    // BigDataCloud fallback
    const loc = rawData.locality || '';
    const admin = rawData.localityInfo?.administrative || [];
    const subColony = admin.find(a => a.adminLevel >= 8)?.name || loc;
    
    exactColony = subColony || loc || 'Residential Area';
    detectedCity = rawData.city || rawData.principalSubdivision || '';
    detectedState = rawData.principalSubdivision || '';
    detectedPostcode = rawData.postcode || '';
    fullAddress = `${exactColony}, ${detectedCity}`;
  }

  // Check if detected city matches our 3 service hubs: Vijayawada, Guntur, Nellore
  const matchedHub = CITIES.find(c => {
    const cName = c.name.toLowerCase();
    const cId = c.id.toLowerCase();
    const haystack = (detectedCity + ' ' + fullAddress).toLowerCase();
    return haystack.includes(cName) || haystack.includes(cId);
  });

  const isOutsideHub = !matchedHub;
  const serviceHub = matchedHub ? matchedHub.name : null;

  // Build the most informative display text:
  // If outside service hub (e.g. Hyderabad), include the city name so the user knows where GPS placed them!
  const displayLocation = isOutsideHub && detectedCity
    ? `${exactColony}, ${detectedCity}`
    : exactColony;

  return {
    colony: exactColony,
    displayLocation,
    city: serviceHub, // null if outside service hub
    rawCity: detectedCity,
    state: detectedState,
    postcode: detectedPostcode,
    fullAddress,
    isOutsideHub,
    accuracyMeters: Math.round(accuracy || 0),
    coords: { latitude, longitude }
  };
}
