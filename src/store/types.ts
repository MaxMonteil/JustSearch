import { ResultsCache, SearchResults } from '../api'

export interface RootState {
  resultsCache: ResultsCache;
  searchResults: SearchResults;
  error: string;
}
