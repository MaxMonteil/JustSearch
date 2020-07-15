<template>
  <div>
    <h1>JustSearch</h1>

    <form
      @submit.prevent="$refs.search.blur()"
      @keyup.esc="clearSearch"
    >
      <input
        v-model="query"
        type="text"
        ref="search"
        @input="$emit('submit', query)"
      >
      <button type="submit">Search</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SearchInput extends Vue {
  query = ''

  clearSearch () {
    this.query = ''
    this.$emit('submit', this.query)
  }
}
</script>
