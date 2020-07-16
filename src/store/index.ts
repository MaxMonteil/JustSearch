import Vue from 'vue'
import Vuex from 'vuex'
import { Search, ResultsCache } from '../api'
import { SearchQuery, SearchResults } from '../api/search.types'

Vue.use(Vuex)

interface RootState {
  resultsCacheSize: number;
  resultsCache: ResultsCache;
  searchResults: SearchResults;
  error: string;
}

const state: RootState = {
  resultsCacheSize: 10,
  resultsCache: new ResultsCache(),
  searchResults: {},
  error: ''
}

export default new Vuex.Store({
  state,
  getters: {
    noResultsFound (state): boolean {
      return Object.keys(state.searchResults).length !== 0 &&
          state.searchResults.totalResults == null
    }
  },
  mutations: {
    saveSearchResults (state, searchResults) {
      state.searchResults = searchResults
    },
    setError (state, error = '') {
      state.error = error
    }
  },
  actions: {
    init ({ state }, { cacheSize }) {
      if (state.resultsCache.size !== cacheSize) {
        state.resultsCache = new ResultsCache(cacheSize)
      }
    },
    async submitSearch ({ state, commit }, { query }: SearchQuery) {
      commit('setError')

      if (state.resultsCache.includes(query)) {
        commit('saveSearchResults', await state.resultsCache.get(query))
      } else {
        try {
          state.resultsCache.add(query, Search({ query }))
          commit('saveSearchResults', await state.resultsCache.peek())
        } catch (e) {
          commit('setError', e)
        }
      }
    },
    clearSearch ({ commit }) {
      commit('saveSearchResults', {})
    }
  }
})
