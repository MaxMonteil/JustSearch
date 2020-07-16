<template>
  <p
    v-if="Object.keys(results).length === 0"
    class="mt-48 text-xl text-center"
  >
    Start searching!
  </p>

  <div v-else>
    <h2 class="mb-2 text-2xl font-bold text-white">
      {{ searchTerm }}
    </h2>

    <ul class="px-2 space-y-6">
      <li
        v-for="result in results.items"
        :key="result.jw_identity_id"
      >
        <ResultsListItem :result="result" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { SearchResults } from '../api/search.types'

import ResultsListItem from './ResultsListItem.vue'

@Component({
  components: {
    ResultsListItem
  }
})
export default class ResultsList extends Vue {
  @Prop({ required: true }) readonly searchTerm!: string
  @Prop({ required: true }) readonly results!: SearchResults
}
</script>
