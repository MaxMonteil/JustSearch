<template>
  <div>
    <li
      v-for="{
        id,
        title,
        object_type: kind,
        scoring,
        offers,
        poster,
        original_release_year: year
      } in results"
      :key="id"
    >
      <p>{{ title }} - {{ year }}</p>
      <p>{{ kind }}</p>
      <p>Ratings:</p>
      <ul>
      <li
        v-for="{ provider_type, value } in formatScores(scoring)"
        :key="provider_type"
      >
        {{ provider_type }}: {{ value }}
      </li>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { ResultItem } from '../api/search.types'

@Component
export default class ResultsListItem extends Vue {
  @Prop({ required: true }) readonly result!: ResultItem
}
</script>
