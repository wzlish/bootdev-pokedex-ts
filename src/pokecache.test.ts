import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should add and retrieve a value from the cache", () => {
    const cache = new Cache(1e3);
    const key = "testKey";
    const value = { data: "testValue" };

    cache.add(key, value);
    const retrievedValue = cache.get(key);

    expect(retrievedValue).toEqual(value);
  });

  it("should return undefined for a non-existent key", () => {
    const cache = new Cache(1e3);
    const retrievedValue = cache.get("nonExistentKey");

    expect(retrievedValue).toBeUndefined();
  });

  it("should remove expired entries during a reap cycle", () => {
    const interval = 1e3;
    const cache = new Cache(interval);
    const key1 = "key1";
    const value1 = "value1";
    const key2 = "key2";
    const value2 = "value2";

    cache.add(key1, value1);
    // Advance timers just enough for key1 to expire in the next reap cycle
    vi.advanceTimersByTime(interval + 1);
    cache.add(key2, value2); // This entry should not expire yet

    // Manually trigger the reap loop by advancing timers for the interval
    vi.advanceTimersByTime(interval);

    expect(cache.get(key1)).toBeUndefined(); // key1 should be reaped
    expect(cache.get(key2)).toEqual(value2); // key2 should still be in cache
  });

  it("should stop the reap loop when stopreaploop is called", () => {
    const cache = new Cache(1e3);
    const key = "testKey";
    const value = "testValue";

    cache.add(key, value);

    // Stop the reap loop immediately
    cache.stopreaploop();

    // Advance timers significantly past the interval
    vi.advanceTimersByTime(1e4);
    // The entry should still be in the cache because the reap loop was stopped
    expect(cache.get(key)).toEqual(value);
  });

  it("should handle multiple add and get operations correctly", () => {
    const cache = new Cache(1e3);
    cache.add("a", 1);
    cache.add("b", 2);
    cache.add("c", 3);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(2);
    expect(cache.get("c")).toBe(3);
    expect(cache.get("d")).toBeUndefined();
  });
});
