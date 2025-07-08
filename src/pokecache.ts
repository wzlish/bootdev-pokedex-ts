export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;
  constructor(interval: number) {
    this.#interval = interval;
    this.#startreaploop();
  }

  add<T>(key: string, value: T) {
    this.#cache.set(key, { createdAt: Date.now(), val: value });
  }

  get<T>(key: string) {
    const cacheHit = this.#cache.get(key);
    if (cacheHit === undefined) {
      if (process.env["DO_DEBUG"]) {
        console.log(`Not cached!`);
      }
      return undefined;
    }
    if (process.env["DO_DEBUG"]) {
      console.log(`Cached resource, timestamp: ${cacheHit.createdAt}`);
    }
    return cacheHit.val;
  }

  #reap() {
    this.#cache.forEach((v: CacheEntry<any>, k: string) => {
      if (v.createdAt <= Date.now() - this.#interval) {
        this.#cache.delete(k);
      }
    });
  }

  #startreaploop() {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopreaploop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
