<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'

import { search } from '../api/search'
import { SearchResults } from '../api/SearchResults'

/* This helps ensure that quick typing displays the right result since the query
 * is async, typing 'superman' quickly might actually show results for 'superm'.
 *
 * It has the added benefit of offering a cache for previous searches.
 */
class ResultsCache {
  private limit: number;
  private items: Record<string, Promise<string | SearchResults>> = {}
  private terms: Array<string> = []

  constructor (limit = 10) {
    this.limit = limit
  }

  public peek (): Promise<string | SearchResults> | object {
    if (this.terms.length === 0) return {}

    return this.items[this.terms[this.terms.length - 1]]
  }

  public includes (key: string): boolean {
    return this.terms.includes(key)
  }

  public get (key: string): Promise<string | SearchResults> | object {
    if (!this.includes(key)) return {}

    return this.items[key]
  }

  public add (key: string, result: Promise<string | SearchResults>): void {
    if (this.terms.includes(key)) return

    this.items[key] = result
    this.terms.push(key)
    if (this.terms.length > this.limit) this.terms.unshift()
  }
}

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
  error = ''
  loading = false

  @Prop({ default: 10 }) readonly resultsCacheSize!: number
  resultsCache = new ResultsCache(this.resultsCacheSize)

  results: SearchResults = {}

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
        this.resultsCache.add(query, search({ query }))
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

  beforeDestroy () {
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
