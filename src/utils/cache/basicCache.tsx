// Cache for storing embed objects belonging to a url
export class _BasicCache {
  CACHE = {};

  /**
   * Get a cached value.
   * If `function` was passed in then an array of results will be returned.
   *
   * @param {any} key The cache key.
   * @returns The cached value or `null` if key is invalid.
   */
  get(key) {
    if (!key) return null;

    // Check if we have a function, if so return the filered values
    if (typeof key === 'function') {
      const keys = Object.keys(this.CACHE);
      const filtered = keys.filter(k => key(k));
      return filtered.map(f => this.CACHE[f]);
    }

    return this.CACHE[key];
  }

  /**
   * Set a cached value.
   *
   * @param {any} key The cache key.
   * @param {any} value The value to cache.
   */
  set(key, value) {
    if (key) {
      this.CACHE[key] = value;
    }
  }

  /**
   * Delete a cached value.
   *
   * @param {any} key The cache key.
   */
  delete(key) {
    if (!key) return;
    delete this.CACHE[key];
  }

  /**
   * Check if cache has a given key.
   *
   * @param {any} key The cache key.
   * @return If the cache has the given key.
   */
  has(key) {
    if (!key) return false;
    return Object.keys(this.CACHE).includes(key);
  }

  /**
   * Clear all values in the cache.
   *
   * If a `condition` function is provided then it will only clear a value if that function returns `true`.
   *
   * @param {function} [condition] A function which takes in key passes back wether the key should be cleared.
   */
  clear(condition = null) {
    if (typeof condition !== 'function') {
      // Clear everything!!
      this.CACHE = {};
      return;
    }

    // Clear only selected values
    const keys = Object.keys(this.CACHE);
    const filtered = keys.filter(k => condition(k));
    filtered.forEach(k => this.delete(k));
  }
}

export const BasicCache = new _BasicCache();
