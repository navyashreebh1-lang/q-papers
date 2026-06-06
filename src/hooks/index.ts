// ============================================================
// Custom Hooks
// ============================================================

"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Debounce hook
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Infinite scroll hook
export function useInfiniteScroll(
  callback: () => void,
  options: { threshold?: number; enabled?: boolean } = {}
) {
  const { threshold = 100, enabled = true } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!enabled || !node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        },
        { rootMargin: `${threshold}px` }
      );

      observerRef.current.observe(node);
    },
    [callback, threshold, enabled]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return sentinelRef;
}

// Search hook
export function useSearch(initialQuery: string = "") {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<unknown[]>([]);
  const [suggestions, setSuggestions] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setResults([]);
      setSuggestions([]);
      return;
    }

    const abortController = new AbortController();

    async function fetchResults() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`,
          { signal: abortController.signal }
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setSuggestions(data.suggestions || []);
        }
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Search error:", err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();

    return () => abortController.abort();
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    results,
    suggestions,
    isLoading,
    debouncedQuery,
  };
}
