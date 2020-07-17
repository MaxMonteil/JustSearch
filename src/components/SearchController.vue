<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode, CreateElement } from 'vue'

import { SearchQuery } from '../api'

@Component
export default class SearchController extends Vue {
  @Prop({ default: 10 }) readonly cacheSize!: number
  created () {
    this.$store.dispatch('init', this.cacheSize)
  }

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
  private loading = false
  private searchTerm = ''
  async submitSearch (queryData: SearchQuery) {
    if (queryData.query.length === 0) {
      this.$store.dispatch('clearSearch')
      return
    }

    await this.delaySearch()

    this.loading = true
    this.searchTerm = queryData.query
    await this.$store.dispatch('submitSearch', queryData)
    this.loading = false
  }

  beforeDestroy (): void {
    clearTimeout(this.delayID)
  }

  render (h: CreateElement): VNode {
    return h(
      'div',
      // eslint-disable-next-line
      this.$scopedSlots.default!({
        error: this.$store.state.error,
        loading: this.loading,
        searchTerm: this.searchTerm,
        results: this.$store.state.searchResults,
        noResults: this.$store.getters.noResultsFound,
        submitSearch: this.submitSearch
      })
    )
  }
}
</script>
