/**
 * Utility functions for generating and parsing sub-area slugs for SEO and URL routing.
 */

// Convert colony / area name to clean URL slug
// e.g. "Brodipet (Main Hub)" -> "brodipet"
// e.g. "Arundelpet (Central Hub)" -> "arundelpet"
// e.g. "Pattabhipuram & Syamalanagar" -> "pattabhipuram-syamalanagar"
// e.g. "Amaravathi Road & Koritepadu" -> "amaravathi-road-koritepadu"
// e.g. "MG Road / Bandar Road" -> "mg-road-bandar-road"
export const areaToSlug = (area) => {
  if (!area) return '';
  return area
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // remove parenthetical notes like (Central Hub), (Main Hub)
    .replace(/&/g, '')       // remove ampersands
    .replace(/[^a-z0-9]+/g, '-') // replace spaces & punctuation with single hyphen
    .replace(/^-+|-+$/g, '');   // trim leading/trailing hyphens
};

// Full slug including parenthetical text for lenient URL matching
// e.g. "Brodipet (Main Hub)" -> "brodipet-main-hub"
export const areaToFullSlug = (area) => {
  if (!area) return '';
  return area
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Match a URL slug to an actual colony name from the city's keyColonies list
export const findAreaFromSlug = (slug, colonies = []) => {
  if (!slug || !Array.isArray(colonies) || colonies.length === 0) return null;
  const cleanSlug = decodeURIComponent(slug).toLowerCase().trim().replace(/^-+|-+$/g, '');
  
  // 1. Exact match with areaToSlug (e.g. 'brodipet' matches 'Brodipet (Main Hub)')
  const matchClean = colonies.find(c => areaToSlug(c) === cleanSlug);
  if (matchClean) return matchClean;

  // 2. Full slug match (e.g. 'brodipet-main-hub' matches 'Brodipet (Main Hub)')
  const matchFull = colonies.find(c => areaToFullSlug(c) === cleanSlug);
  if (matchFull) return matchFull;

  // 3. Raw case-insensitive match or URL-decoded match
  const rawMatch = colonies.find(c => c.toLowerCase() === cleanSlug || c.toLowerCase() === decodeURIComponent(slug).toLowerCase());
  if (rawMatch) return rawMatch;

  // 4. Substring / partial keyword match (e.g. 'brodipet' inside 'Brodipet (Main Hub)')
  const partial = colonies.find(c => {
    const s1 = areaToSlug(c);
    const s2 = areaToFullSlug(c);
    const cLow = c.toLowerCase();
    return (
      s1.includes(cleanSlug) ||
      cleanSlug.includes(s1) ||
      s2.includes(cleanSlug) ||
      cleanSlug.includes(s2) ||
      cLow.includes(cleanSlug) ||
      cleanSlug.includes(cLow)
    );
  });
  if (partial) return partial;

  return null;
};

// Match category slug to category ID
export const findCategoryFromSlug = (slug, categories = []) => {
  if (!slug || !Array.isArray(categories)) return null;
  const clean = decodeURIComponent(slug).toLowerCase().trim().replace(/^-+|-+$/g, '');
  
  // 1. Direct ID match (e.g. 'ac' === 'ac')
  const byId = categories.find(c => c.id.toLowerCase() === clean);
  if (byId) return byId.id;

  // 2. Slugified name match (e.g. 'ac-service-repair' or 'ac-repair')
  const byName = categories.find(c => areaToSlug(c.name) === clean);
  if (byName) return byName.id;

  // 3. Partial keyword matching
  const byPartial = categories.find(c => {
    const cid = c.id.toLowerCase();
    const cname = areaToSlug(c.name);
    return clean.includes(cid) || cid.includes(clean) || clean.includes(cname) || cname.includes(clean);
  });
  if (byPartial) return byPartial.id;

  return null;
};

// Convert subcategory name or object to clean URL slug
export const subCategoryToSlug = (sub) => {
  if (!sub) return '';
  if (typeof sub === 'string') return areaToSlug(sub);
  return areaToSlug(sub.name) || sub.id;
};

// Match subcategory slug to subcategory ID
export const findSubcategoryFromSlug = (slug, subcategories = []) => {
  if (!slug || !Array.isArray(subcategories)) return null;
  const clean = decodeURIComponent(slug).toLowerCase().trim().replace(/^-+|-+$/g, '');

  // 1. Direct ID match (e.g. 'lcd-tv' === 'lcd-tv')
  const byId = subcategories.find(s => s.id.toLowerCase() === clean);
  if (byId) return byId.id;

  // 2. Slugified name match (e.g. 'lcd-tv-repair' matches 'LCD TV Repair')
  const byName = subcategories.find(s => areaToSlug(s.name) === clean);
  if (byName) return byName.id;

  // 3. Name with hyphen conversion
  const byHyphen = subcategories.find(s => s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === clean);
  if (byHyphen) return byHyphen.id;

  // 4. Partial keyword matching
  const byPartial = subcategories.find(s => {
    const sid = s.id.toLowerCase();
    const sname = areaToSlug(s.name);
    return clean.includes(sid) || sid.includes(clean) || clean.includes(sname) || sname.includes(clean);
  });
  if (byPartial) return byPartial.id;

  return null;
};

