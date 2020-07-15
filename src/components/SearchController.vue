<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'

import { Search, SearchResults, ResultsCache } from '../api'

@Component
export default class SearchController extends Vue {
  // TYPING DELAY
  @Prop({ default: 500 }) readonly searchDelay!: number
  private delayID!: number

  delaySearch () {
    clearTimeout(this.delayID)

    return new Promise(resolve => {
      this.delayID = setTimeout(() => resolve(), this.searchDelay)
    })
  }

  // SEARCH
  private error = ''
  private loading = false

  @Prop({ default: 10 }) readonly resultsCacheSize!: number
  private resultsCache = new ResultsCache(this.resultsCacheSize)
  private results: SearchResults = {}

  async submitSearch (query: string) {
    if (query.length === 0) {
      this.results = {}
      return
    }

    await this.delaySearch()

    this.loading = true
    this.error = ''

    if (this.resultsCache.includes(query)) {
      this.results = (await this.resultsCache.get(query)) as SearchResults
    } else {
      try {
        this.resultsCache.add(query, Search({ query }))
        this.results = (await this.resultsCache.peek()) as SearchResults
      } catch (e) {
        this.error = e
      }
    }

    this.loading = false
  }

  get noResultsFound (): boolean {
    return Object.keys(this.results).length !== 0 &&
      this.results.totalResults == null
  }

  beforeDestroy (): void {
    clearTimeout(this.delayID)
  }

  render (h: CreateElement): VNode {
    return h(
      'div',
      // eslint-disable-next-line
      this.$scopedSlots.default!({
        error: this.error,
        loading: this.loading,
        results: this.results.items,
        noResults: this.noResultsFound,
        submitSearch: this.submitSearch
      })
    )
  }
}
</script>
