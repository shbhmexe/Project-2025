"use client";

import * as React from "react";

// Generic favorite item type
export type FavoriteItem = {
    type: "syllabus" | "pyq" | "youtube";
    semester: number;
    subject: string;
    url?: string;
};

const STORAGE_KEY = "mduiitmlearn:favorites:items:v1";
const EVENT_NAME = "mduiitmlearn:favorites:items:changed";

function normalizeItem(item: FavoriteItem): FavoriteItem | null {
    const semester = Number(item.semester);
    const subject = String(item.subject || "").trim();
    const type = item.type;

    if (!["syllabus", "pyq", "youtube"].includes(type)) return null;
    if (!Number.isFinite(semester) || semester <= 0) return null;
    if (!subject) return null;

    return { type, semester, subject, url: item.url };
}

function keyOf(item: FavoriteItem): string {
    return `${item.type}:${item.semester}:${item.subject}`;
}

function dedupe(items: FavoriteItem[]): FavoriteItem[] {
    const map = new Map<string, FavoriteItem>();
    for (const item of items) {
        const n = normalizeItem(item);
        if (!n) continue;
        map.set(keyOf(n), n);
    }
    return Array.from(map.values());
}

export function getFavoriteItems(): FavoriteItem[] {
    if (typeof window === "undefined") return [];

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        return dedupe(parsed as FavoriteItem[]);
    } catch {
        return [];
    }
}

function setFavoriteItems(next: FavoriteItem[]) {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dedupe(next)));
        window.dispatchEvent(new Event(EVENT_NAME));
    } catch {
        // ignore storage errors
    }
}

export function isFavoriteItem(items: FavoriteItem[], item: FavoriteItem): boolean {
    const n = normalizeItem(item);
    if (!n) return false;
    return items.some((f) => f.type === n.type && f.semester === n.semester && f.subject === n.subject);
}

export function toggleFavoriteItem(items: FavoriteItem[], item: FavoriteItem): FavoriteItem[] {
    const n = normalizeItem(item);
    if (!n) return items;

    const exists = items.some((f) => f.type === n.type && f.semester === n.semester && f.subject === n.subject);
    return exists
        ? items.filter((f) => !(f.type === n.type && f.semester === n.semester && f.subject === n.subject))
        : dedupe([...items, n]);
}

export function useFavoriteItems(type?: "syllabus" | "pyq" | "youtube") {
    const [allFavorites, setAllFavorites] = React.useState<FavoriteItem[]>([]);

    const refresh = React.useCallback(() => {
        setAllFavorites(getFavoriteItems());
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

    // Filter by type if specified
    const favorites = React.useMemo(() => {
        if (!type) return allFavorites;
        return allFavorites.filter((f) => f.type === type);
    }, [allFavorites, type]);

    const isFavorite = React.useCallback(
        (item: Omit<FavoriteItem, "type"> & { type?: string }) => {
            const fullItem = { ...item, type: item.type || type } as FavoriteItem;
            return isFavoriteItem(allFavorites, fullItem);
        },
        [allFavorites, type]
    );

    const toggleFavorite = React.useCallback(
        (item: Omit<FavoriteItem, "type"> & { type?: string }) => {
            const fullItem = { ...item, type: item.type || type } as FavoriteItem;
            setAllFavorites((prev) => {
                const next = toggleFavoriteItem(prev, fullItem);
                setFavoriteItems(next);
                return next;
            });
        },
        [type]
    );

    const clearAll = React.useCallback(() => {
        if (type) {
            // Clear only items of this type
            setAllFavorites((prev) => {
                const next = prev.filter((f) => f.type !== type);
                setFavoriteItems(next);
                return next;
            });
        } else {
            setAllFavorites([]);
            setFavoriteItems([]);
        }
    }, [type]);

    return { favorites, isFavorite, toggleFavorite, clearAll };
}
