<template>
  <div class="flex flex-col items-center justify-between min-h-screen p-4 text-gray-500 bg-gray-900">
    <main class="flex flex-col items-center w-full mt-12 space-y-4">
      <h1 class="text-6xl font-bold leading-none tracking-wide text-blue-700 sexy">
        JustSearch
      </h1>

      <p class="max-w-xs leading-tight text-center text-white md:max-w-screen-lg md:text-lg">
        Your one stop shop to find out where you can stream your favorite movies and shows!
      </p>

      <SearchController
        v-slot="{ error, loading, searchTerm, results, noResults, submitSearch }"
        class="w-full space-y-8"
      >
        <SearchInput @submit="submitSearch" />

        <p v-if="error && !loading" class="px-4 py-3 text-center text-white bg-red-700 rounded-lg">{{ error }}</p>

        <div v-if="loading" class="text-center">
          <div class="inline-block w-8 h-8 border-l-4 border-blue-900 rounded-l-full rotating" />
        </div>

        <div v-if="!loading && !error">
          <div v-if="noResults">
            <p>We couldn't find any results for</p>
          </div>

          <ResultsList
            :results="results"
            :search-term="searchTerm"
          />

        </div>
      </SearchController>
    </main>

    <footer class="pt-8">
      <p class="text-sm text-center">
        All sources come from the <a class="text-blue-500 underline" href="https://www.justwatch.com/">JustWatch</a> search API.
      </p>
    </footer>
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

<style>
html {
  scroll-behavior: smooth;
}
</style>

<style scoped>
.sexy {
  background: linear-gradient(to right, #3182CE, #4FD1C5);
  background-clip: text;
  color: transparent;
}

.bottom-2 {
  bottom: 2rem;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotating {
  animation: rotating 0.75s linear infinite;
}
</style>
