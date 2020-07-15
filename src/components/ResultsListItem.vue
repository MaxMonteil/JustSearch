<template>
  <div>
    <p>{{ result.title }} - {{ result.original_release_year }}</p>
    <p>{{ result.object_type }}</p>
    <p>Ratings:</p>
    <ul>
    <li
      v-for="{ provider_type, value } in formatScores(result.scoring)"
      :key="provider_type"
    >
      {{ provider_type }}: {{ value }}
    </li>
    </ul>
    <p>where to stream:</p>
    <ul>
      <li
        v-for="({ service, url }, i) in filterAndFormatOffers(result.offers)"
        :key="i"
      >
        <a :href="url">{{ service }}</a>
      </li>
    </ul>
    <img :src="posterURL(result.poster)">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { RawScore, RawOffer, ResultItem } from '../api/search.types'

const getServiceName = (url: string): string => new URL(url).hostname.split('.').splice(-2, 1)[0]

@Component
export default class ResultsListItem extends Vue {
  @Prop({ required: true }) readonly result!: ResultItem

  posterURL (url: string) {
    const s = url.substring(0, url.lastIndexOf('/'))
    return `https://images.justwatch.com${s}/s166`
  }

  formatScores (scores: Array<RawScore>) {
    return scores.filter(({ provider_type: provider }) => provider.endsWith('score'))
  }

  filterAndFormatOffers (offers: Array<RawOffer>) {
    offers = offers || []
    const streamOffers = offers
      .filter(({ monetization_type: monetization }) => monetization === 'flatrate') // get those with streaming offers
      .map(({ urls: { standard_web: url } }) => url) // keep url

    const links = [...new Set(streamOffers)] // dedup links

    return links.map(link => ({
      service: getServiceName(link),
      url: link
    }))
  }
}
</script>
