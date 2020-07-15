<template>
  <div>
    <h1>JustSearch</h1>

    <p>Your one stop shop to find out where you can stream your favorite movies and shows!</p>

    <SearchController
      v-slot="{ error, loading, results, noResults, submitSearch }"
      class="hello"
    >
      <SearchInput @submit="submitSearch" />

      <p v-if="error">{{ error }}</p>

      <p v-if="loading">Loading...</p>
      <div v-else>
        <p v-if="noResults">0 results</p>

        <ResultsList :results="results" />
      </div>
    </SearchController>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import SearchInput from './components/SearchInput.vue'
import SearchController from './components/SearchController.vue'
import ResultsList from './components/ResultsList.vue'

@Component({
  components: {
    SearchInput,
    SearchController,
    ResultsList
  }
})
export default class App extends Vue {}
</script>
