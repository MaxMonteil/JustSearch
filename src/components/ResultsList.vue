<template>
  <p
    v-if="Object.keys(results).length === 0"
    class="mt-48 text-xl text-center"
  >
    Start searching!
  </p>

  <ul
    v-else
    class="px-2 space-y-6"
  >
    <li
      v-for="result in results.items"
      :key="result.jw_identity_id"
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

  private testResults: SearchResults = {
    totalResults: 1,
    items: [
      {
        // eslint-disable-next-line
        jw_identity_id: 1,
        title: 'A really long movie title so that I can see how it wraps',
        // eslint-disable-next-line
        object_type: 'movie',
        scoring: [
          {
            // eslint-disable-next-line
            provider_type: 'imdb:score',
            value: 7.3
          }
        ],
        offers: [
          {
            // eslint-disable-next-line
            monetization_type: 'flatrate',
            // eslint-disable-next-line
            presentation_type: 'hd',
            urls: {
              // eslint-disable-next-line
              standard_web: 'https://play.google.com/store/movies/details/Superman_Returns?gl=US&hl=en&id=Lr4Pzi_584g',
              // eslint-disable-next-line
              deeplink_android_tv: 'Lr4Pzi_584g'
            }
          },
          {
            // eslint-disable-next-line
            monetization_type: 'flatrate',
            // eslint-disable-next-line
            presentation_type: 'hd',
            urls: {
              // eslint-disable-next-line
              standard_web: 'https://play.hbomax.com/store/movies/details/Superman_Returns?gl=US&hl=en&id=Lr4Pzi_584g',
              // eslint-disable-next-line
              deeplink_android_tv: 'Lr4Pzi_584g'
            }
          }
        ],
        poster: '/poster/8734741/{profile}',
        // eslint-disable-next-line
        original_release_year: 2006
      }
    ]
  }
}
</script>
