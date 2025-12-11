import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity Client
export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || '0v9orvow',
  dataset: import.meta.env.SANITY_DATASET || 'autos',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Bild URL Builder
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ============ FAHRZEUG QUERIES ============

// Alle verfügbaren Fahrzeuge
export async function getAlleFahrzeuge() {
  return await client.fetch(`
    *[_type == "fahrzeug" && status != "verkauft"] | order(_createdAt desc) {
      _id,
      marke,
      modell,
      "slug": slug.current,
      baujahr,
      kilometerstand,
      preis,
      kraftstoff,
      getriebe,
      leistungPS,
      hauptbild,
      status,
      badge
    }
  `);
}

// Einzelnes Fahrzeug nach Slug
export async function getFahrzeugBySlug(slug: string) {
  return await client.fetch(`
    *[_type == "fahrzeug" && slug.current == $slug][0] {
      _id,
      marke,
      modell,
      "slug": slug.current,
      baujahr,
      kilometerstand,
      preis,
      preisArt,
      mwst,
      kraftstoff,
      getriebe,
      leistungPS,
      leistungKW,
      hubraum,
      farbe,
      tupielen,
      fahrzeugtyp,
      ausstattung,
      beschreibung,
      hauptbild,
      galerie,
      status,
      badge
    }
  `, { slug });
}

// Alle Slugs für getStaticPaths()
export async function getAlleFahrzeugSlugs() {
  return await client.fetch(`
    *[_type == "fahrzeug"] {
      "slug": slug.current
    }
  `);
}

// Ähnliche Fahrzeuge
export async function getAehnlicheFahrzeuge(marke: string, currentId: string) {
  return await client.fetch(`
    *[_type == "fahrzeug" && marke == $marke && _id != $currentId && status != "verkauft"][0...3] {
      _id,
      marke,
      modell,
      "slug": slug.current,
      baujahr,
      preis,
      hauptbild
    }
  `, { marke, currentId });
}

// ============ EINSTELLUNGEN QUERY ============

export async function getEinstellungen() {
  return await client.fetch(`
    *[_type == "einstellungen"][0] {
      firmenname,
      telefon,
      email,
      adresse,
      oeffnungszeiten,
      googleMapsLink,
      socialMedia
    }
  `);
}