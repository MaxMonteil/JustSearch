<template>
  <div>
    <img :src="posterURL(result.poster)">
    <div>
      <p>{{ result.title }} - {{ result.object_type }}</p>
      <p>{{ result.original_release_year }}</p>
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
    </div>
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
    // url -> /poster/some-number/{profile}
    const s = url.substring(0, url.lastIndexOf('/'))
    return `${process.env.VUE_APP_IMAGES_URL}${s}/${process.env.VUE_APP_IMAGES_PROFILE}`
  }

  formatScores (scores: Array<RawScore>) {
    return scores.filter(({ provider_type: provider }) => provider.endsWith('score'))
  }

  private monetizationType = 'flatrate'
  filterAndFormatOffers (offers: Array<RawOffer>) {
    offers = offers || []
    const streamOffers = offers
      .filter(({ monetization_type: monetization }) => monetization === this.monetizationType)
      .map(({ urls: { standard_web: url } }) => url)

    const links = [...new Set(streamOffers)]

    return links.map(link => ({
      service: getServiceName(link),
      url: link
    }))
  }
}
</script>
