'use client'

export const setData = (key: string, value: string) => {
    localStorage.setItem(key, value);
}

export const getData = (key: string): string|null => {
    return localStorage.getItem(key);
}