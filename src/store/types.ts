import { ResultsCache, SearchResults } from '../api'

export interface RootState {
  resultsCacheSize: number;
  resultsCache: ResultsCache;
  searchResults: SearchResults;
  error: string;
}
