<template>
  <ul>
    <li
      v-for="result in results"
      :key="result.id"
    >
      <ResultsListItem :result="result" />
    </li>
  </ul>
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
  @Prop({ required: true }) readonly results!: SearchResults
}
</script>
