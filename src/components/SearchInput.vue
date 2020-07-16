<template>
  <form
    @submit.prevent="$refs.search.blur()"
    @keyup.esc="clearSearch"
  >
    <input
      v-model="queryData.query"
      type="text"
      ref="search"
      @input="$emit('submit', queryData)"
    >
    <button type="submit">Search</button>
  </form>
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
