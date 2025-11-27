// Polyfill localStorage for server-side rendering
if (typeof window === 'undefined') {
    // Create a mock localStorage that won't cause errors during SSR
    global.localStorage = {
        getItem: () => null,
        setItem: () => { },
        removeItem: () => { },
        clear: () => { },
        key: () => null,
        length: 0
    };
}

export { };
