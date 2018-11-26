export type Pair<K, V> = [K, V];

/**
 * Registry stores data attached with a key.
 */
export class Registry<K, V> {
  private map = new Map<K, V>();
  private cachedPairs?: Array<Pair<K, V>>;

  /**
   * name is registry name, used for error message
   */
  constructor(readonly name: string) {
  }

  /**
   * Register key/value, failed if k exist.
   */
  register(k: K, v: V) {
    this.cachedPairs = undefined;

    if (this.map.has(k)) {
      throw Error(`"${k}" already registered in "${this.name}"`);
    }

    this.map.set(k, v);
  }

  /**
   * Get value attached with the key, failed if k not registered.
   */
  get(k: K): V {
    const r = this.map.get(k);
    if (r == null) {
      throw Error(`"${k}" not registered in "${this.name}"`);
    }

    return r;
  }

  /**
   * Get value attached with key, returns default value if key not defined.
   */
  getDefault<R extends V | undefined>(k: K, def?: R): R {
    return (this.map.get(k) || def) as R;
  }

  /**
   * Register key/value s from an array, suitable for batch registration.
   */
  fromArray(arr: Array<Pair<K, V>>) {
    this.cachedPairs = undefined;

    for (const pair of arr) {
      this.register(pair[0], pair[1]);
    }
  }

  /**
   * Get registered value pairs.
   *
   * pairs() is performance optimized, result is cached inside Registry,
   * so never change return value of pairs().
   */
  pairs(): Array<Pair<K, V>> {
    if (!this.cachedPairs) {
      this.cachedPairs = Array.from(this.map.entries());
    }

    return this.cachedPairs;
  }
}
