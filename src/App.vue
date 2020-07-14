<template>
  <SearchController
    v-slot="{ error, loading, results, noResults, submitSearch }"
    class="hello"
  >
    <SearchInput @submit="submitSearch" />

    <p v-if="error">{{ error }}</p>

    <p v-if="loading">Loading...</p>
    <div v-else>
      <p v-if="noResults">0 results</p>
      <ul>
        <li
          v-for="{ id, title } in results"
          :key="id"
        >
          {{ title }}
        </li>
      </ul>
    </div>
  </SearchController>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SearchInput from './components/SearchInput.vue'
import SearchController from './components/SearchController.vue'

@Component({
  components: {
    SearchInput,
    SearchController
  }
})
export default class App extends Vue {}
</script>
