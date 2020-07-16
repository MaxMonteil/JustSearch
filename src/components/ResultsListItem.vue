<template>
  <section class="flex bg-gray-800 rounded-md space-x-3">
    <img
      class="w-1/3 rounded-l-md"
      :src="posterURL(result.poster)"
      :alt="result.title + ' poster'"
    >
    <article class="flex flex-col justify-between py-3 overflow-hidden">
      <div>
        <div>
          <p class="text-sm font-bold leading-none tracking-wide uppercase">
            <span class="text-blue-500">{{ result.object_type }}</span>
            - {{ result.original_release_year }}
          </p>
          <h2 class="text-xl leading-tight text-white truncate">{{ result.title }}</h2>
        </div>

        <ul class="flex mt-2 space-x-4">
          <li
            class="space-x-2"
            v-for="{ provider_type, value } in formatScores(result.scoring)"
            :key="provider_type"
          >
            <img width="16" class="inline" :src="providerLogo(provider_type)" :alt="provider_type">
            <p class="inline text-sm text-white">{{ value }}</p>
          </li>
        </ul>
      </div>

      <h3 v-if="offers.length === 0">No streaming options found</h3>
      <div v-else>
        <h3>Available at:</h3>
        <ul>
          <li
            class="inline-block mr-2"
            v-for="({ service, url }, i) in offers"
            :key="i"
          >
            <a
              :href="url"
              class="text-white underline capitalize"
            >
              {{ service }}
            </a>
          </li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { RawScore, RawOffer, ResultItem } from '../api/search.types'

const getServiceName = (url: string): string => new URL(url).hostname.split('.').splice(-2, 1)[0]

function filterAndFormatOffers (offers: Array<RawOffer>, monetizationType: string) {
  if (offers == null) return []

  const streamOffers = offers
    .filter(({ monetization_type: monetization }) => monetization === monetizationType)
    .map(({ urls: { standard_web: url } }) => url)

  const uniqueLinks = [...new Set(streamOffers)]

  return uniqueLinks.map(link => ({
    service: getServiceName(link),
    url: link
  }))
}

@Component
export default class ResultsListItem extends Vue {
  @Prop({ required: true }) readonly result!: ResultItem

  providerLogo (provider: string) {
    const paths: Record<string, string> = {
      'tmdb:score': './images/tmdb-logo.png',
      'imdb:score': './images/imdb-logo.png'
    }

    return paths[provider]
  }

  posterURL (url: string) {
    if (url == null) return './images/poster-placeholder.png'

    // url -> /poster/some-number/{profile}
    const s = url.substring(0, url.lastIndexOf('/'))
    return `${process.env.VUE_APP_IMAGES_URL}${s}/${process.env.VUE_APP_IMAGES_PROFILE}`
  }

  formatScores (scores: Array<RawScore>) {
    return scores.filter(({ provider_type: provider }) => provider.endsWith('score')).sort()
  }

  private monetizationType = 'flatrate'
  get offers () {
    return filterAndFormatOffers(this.result.offers, this.monetizationType)
  }
}
</script>
