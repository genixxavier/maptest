export interface PlacesResponde {
    type:        string;
    query:       number[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:            string;
    type:          string;
    place_type:    string[];
    relevance:     number;
    properties:    Properties;
    text_es:       string;
    place_name_es: string;
    text:          string;
    place_name:    string;
    center:        number[];
    geometry:      Geometry;
    context?:      Context[];
    bbox?:         number[];
    language_es?:  Language;
    language?:     Language;
}

export interface Context {
    id:           string;
    mapbox_id:    string;
    text_es:      string;
    text:         string;
    wikidata?:    Wikidata;
    language_es?: Language;
    language?:    Language;
    short_code?:  string;
}

export enum Language {
    Es = "es",
}

export enum Wikidata {
    Q2868 = "Q2868",
    Q419 = "Q419",
    Q579240 = "Q579240",
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    accuracy?:   string;
    mapbox_id?:  string;
    wikidata?:   Wikidata;
    short_code?: string;
}
