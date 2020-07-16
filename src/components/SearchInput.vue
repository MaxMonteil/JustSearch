<template>
  <div class="sticky top-0 z-10 flex justify-center pt-4">
    <form
      class="flex w-full max-w-3xl rounded-full shadow focus-within:shadow-outline"
      @submit.prevent="$refs.search.blur()"
      @keyup.esc="clearSearch"
    >
      <input
        class="flex-grow p-2 pl-6 text-lg text-gray-200 bg-blue-900 rounded-l-full focus:outline-none"
        v-model.trim="queryData.query"
        type="text"
        ref="search"
        @input="$emit('submit', queryData)"
        @keyup.esc="clearSearch"
      >
      <button
        class="px-4 py-1 text-lg font-medium text-white bg-blue-700 rounded-r-full focus:outline-none focus:bg-blue-800"
        type="submit"
      >
        Search
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
