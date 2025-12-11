// src/lib/sanity.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity Client
export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  useCdn: true,  // CDN für schnellere Ladezeiten
  apiVersion: '2024-01-01',
  // Token nur wenn nötig (für Drafts)
  // token: import.meta.env.SANITY_API_TOKEN,
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

// Auch verkaufte Fahrzeuge (für "Referenzen" Seite)
export async function getAlleFahrzeugeInklVerkauft() {
  return await client.fetch(`
    *[_type == "fahrzeug"] | order(_createdAt desc) {
      _id,
      marke,
      modell,
      "slug": slug.current,
      baujahr,
      preis,
      hauptbild,
      status
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

// Fahrzeuge nach Marke
export async function getFahrzeugeNachMarke(marke: string) {
  return await client.fetch(`
    *[_type == "fahrzeug" && marke == $marke && status != "verkauft"] {
      _id,
      marke,
      modell,
      "slug": slug.current,
      baujahr,
      preis,
      hauptbild,
      status
    }
  `, { marke });
}

// Ähnliche Fahrzeuge (für Detailseite)
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

// ============ SEITENINHALT QUERIES ============

export async function getSeiteninhalt(seite: string) {
  return await client.fetch(`
    *[_type == "seiteninhalt" && seite == $seite][0] {
      ueberschrift,
      text,
      bild
    }
  `, { seite });
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