export interface SearchQuery {
    query: string;
}

export interface RawScore {
  provider_type: string;
  value: number;
}

export interface RawOffer {
  monetization_type: string;
  presentation_type: string;
  urls: {
    [key: string]: string;
  };
}

export interface ResultItem {
    jw_identity_id: number;
    title: string;
    object_type: string;
    scoring: Array<RawScore>;
    offers: Array<RawOffer>;
    poster: string;
    original_release_year: number;
}

export interface SearchResults {
    items?: Array<ResultItem>;
    totalResults?: number;
}
