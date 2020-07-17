import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'

import { RootState } from './types'
import { Search, ResultsCache, SearchQuery } from '../api'

Vue.use(Vuex)

const state: RootState = {
  resultsCache: new ResultsCache(),
  searchResults: {},
  error: ''
}

const store: StoreOptions<RootState> = {
  state,
  getters: {
    noResultsFound (state): boolean {
      return Object.keys(state.searchResults).length !== 0 &&
          state.searchResults.totalResults == null
    }
  },
  mutations: {
    createResultsCache (state, cacheSize) {
      state.resultsCache = new ResultsCache(cacheSize)
    },
    saveSearchResults (state, searchResults) {
      state.searchResults = searchResults
    },
    setError (state, error) {
      state.error = error
    }
  },
  actions: {
    init ({ commit }, cacheSize: number) {
      commit('createResultsCache', cacheSize)
    },
    async submitSearch ({ state, commit }, { query }: SearchQuery) {
      commit('setError', '')

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
}

export default new Vuex.Store<RootState>(store)
