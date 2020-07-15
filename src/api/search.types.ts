export interface SearchQuery {
    query: string;
}

export interface SearchResults {
    items?: Array<object>;
    totalResults?: number;
}
