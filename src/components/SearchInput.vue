<template>
  <div class="sticky top-0 z-10 flex justify-center pt-4">
    <form
      class="flex w-full max-w-3xl rounded-full shadow focus-within:shadow-outline"
      @submit.prevent="$refs.search.blur()"
      @keyup.esc="clearSearch"
    >
      <label
        for="search"
        class="sr-only"
      >
        Search for a show or movie
      </label>
      <input
        id="search"
        class="flex-grow p-2 pl-6 text-lg text-gray-200 bg-blue-900 rounded-l-full focus:outline-none"
        v-model.trim="queryData.query"
        type="text"
        ref="search"
        @input="$emit('submit', queryData)"
        @keyup.esc="clearSearch"
      >
      <button
        class="flex items-center px-4 py-1 text-lg font-medium text-white bg-blue-700 rounded-r-full focus:outline-none focus:bg-blue-800"
        type="submit"
      >
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="inline-block mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
          <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
        <span class="hidden sm:inline">Search</span>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { SearchQuery } from '../api'

@Component
export default class SearchInput extends Vue {
  private queryData: SearchQuery = {
    query: ''
  }

  clearSearch () {
    this.queryData.query = ''
    this.$emit('submit', this.queryData)
  }
}
</script>
