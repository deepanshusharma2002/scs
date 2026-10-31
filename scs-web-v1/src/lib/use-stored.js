"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "3sc:storage";

function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

function read(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** A localStorage value that renders as `null` on the server and during hydration. */
export function useStored(key) {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null,
  );

  const set = useCallback(
    (next) => {
      try {
        if (next == null) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, String(next));
      } catch {
        // Storage can be unavailable (private mode); the UI still works for this session.
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [key],
  );

  return [value, set];
}

let mountedAt;
const noop = () => () => {};

/** Milliseconds timestamp captured once on the client; `null` on the server. */
export function useNow() {
  return useSyncExternalStore(
    noop,
    () => (mountedAt ??= Date.now()),
    () => null,
  );
}
