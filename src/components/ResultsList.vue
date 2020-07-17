<template>
  <p
    v-if="Object.keys(results).length === 0"
    class="mt-48 text-xl text-center"
  >
    Start searching!
  </p>

  <div
    class="mx-auto"
    v-else
  >
    <h2 class="mx-auto mb-2 text-2xl font-bold text-white max-w-screen-xl">
      {{ searchTerm }}
    </h2>

    <ul class="px-2 mx-auto space-y-6 md:space-y-0 md:gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 lg:max-w-screen-xl">
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
