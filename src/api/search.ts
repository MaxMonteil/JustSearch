import { SearchQuery, SearchResults } from './search.types'

export async function Search (queryData: SearchQuery): Promise<string | SearchResults> {
  const config = {
    method: 'POST',
    body: JSON.stringify(queryData),
    headers: { 'content-type': 'application/json' }
  }

  return window
    .fetch(process.env.VUE_APP_SEARCH_URL, config)
    .then(async response => {
      const text = await response.text()

      try {
        const data = text && JSON.parse(text)

        if (!response.ok) {
          const error = (data && data.message) || response.statusText
          return Promise.reject(error)
        }

        const {
          total_results: totalResults,
          items
        }: { total_results: number; items: Array<object> } = data

        return { totalResults, items } as SearchResults
      } catch (e) {
        return Promise.reject(response.statusText)
      }
    })
}
