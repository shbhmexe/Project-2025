"use client";

import * as React from "react";

export type FavoriteNote = {
  semester: number;
  subject: string;
};

const STORAGE_KEY = "mduiitmlearn:favorites:notes:v1";
const EVENT_NAME = "mduiitmlearn:favorites:notes:changed";

function normalizeFavorite(note: FavoriteNote): FavoriteNote | null {
  const semester = Number(note.semester);
  const subject = String(note.subject || "").trim();

  if (!Number.isFinite(semester) || semester <= 0) return null;
  if (!subject) return null;

  return { semester, subject };
}

function keyOf(note: FavoriteNote): string {
  return `${note.semester}:${note.subject}`;
}

function dedupe(favs: FavoriteNote[]): FavoriteNote[] {
  const map = new Map<string, FavoriteNote>();
  for (const fav of favs) {
    const n = normalizeFavorite(fav);
    if (!n) continue;
    map.set(keyOf(n), n);
  }
  return Array.from(map.values());
}

export function getFavoriteNotes(): FavoriteNote[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return dedupe(parsed as FavoriteNote[]);
  } catch {
    return [];
  }
}

function setFavoriteNotes(next: FavoriteNote[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dedupe(next)));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    // ignore storage errors (private mode / quota / disabled)
  }
}

export function isFavoriteNote(favs: FavoriteNote[], note: FavoriteNote): boolean {
  const n = normalizeFavorite(note);
  if (!n) return false;
  return favs.some((f) => f.semester === n.semester && f.subject === n.subject);
}

export function toggleFavoriteNote(favs: FavoriteNote[], note: FavoriteNote): FavoriteNote[] {
  const n = normalizeFavorite(note);
  if (!n) return favs;

  const exists = favs.some((f) => f.semester === n.semester && f.subject === n.subject);
  return exists
    ? favs.filter((f) => !(f.semester === n.semester && f.subject === n.subject))
    : dedupe([...favs, n]);
}

export function useFavoriteNotes() {
  const [favorites, setFavorites] = React.useState<FavoriteNote[]>([]);

  const refresh = React.useCallback(() => {
    setFavorites(getFavoriteNotes());
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  React.useEffect(() => {
    const onCustom = () => refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh();
    };

    window.addEventListener(EVENT_NAME, onCustom);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVENT_NAME, onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, [refresh]);

  const isFavorite = React.useCallback(
    (note: FavoriteNote) => isFavoriteNote(favorites, note),
    [favorites]
  );

  const toggleFavorite = React.useCallback((note: FavoriteNote) => {
    setFavorites((prev) => {
      const next = toggleFavoriteNote(prev, note);
      setFavoriteNotes(next);
      return next;
    });
  }, []);

  const clearAll = React.useCallback(() => {
    setFavorites([]);
    setFavoriteNotes([]);
  }, []);

  return { favorites, isFavorite, toggleFavorite, clearAll };
}
