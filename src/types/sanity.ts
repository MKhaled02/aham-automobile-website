export interface Fahrzeug {
  _id: string;
  marke: string;
  modell: string;
  slug: string;
  baujahr: number;
  kilometerstand: number;
  preis: number;
  preisArt?: 'festpreis' | 'vb' | 'aufAnfrage';
  mwst?: boolean;
  kraftstoff: string;
  getriebe: string;
  leistungPS?: number;
  leistungKW?: number;
  hubraum?: number;
  farbe?: string;
  fahrzeugtyp?: string;
  ausstattung?: string[];
  beschreibung?: string;
  hauptbild: SanityImage;
  galerie?: SanityImage[];
  status: 'verfuegbar' | 'reserviert' | 'verkauft';
  badge?: 'neu' | 'top' | 'reduziert' | 'garantie' | 'tuev';
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
  };
}

export interface Einstellungen {
  firmenname: string;
  telefon: string;
  email: string;
  adresse: {
    strasse: string;
    plz: string;
    ort: string;
  };
  oeffnungszeiten: Array<{
    tage: string;
    zeiten: string;
  }>;
  googleMapsLink?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
}
