import { SearchResults } from './search.types'

/* This helps ensure that quick typing displays the right result since the query
 * is async, typing 'superman' quickly might actually show results for 'superm'.
 *
 * It has the added benefit of offering a cache for previous searches.
 */
export class ResultsCache {
  private _size: number;
  private items: Record<string, Promise<string | SearchResults>> = {}
  private terms: Array<string> = []

  constructor (size = 10) {
    this._size = size
  }

  get size () {
    return this._size
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
    if (this.terms.length > this._size) this.terms.unshift()
  }
}
