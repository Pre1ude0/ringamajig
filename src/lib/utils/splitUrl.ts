function splitUrl(entry: string): [string, string] {
    const match = entry.match(/^\s*(\S+)\s*\[\s*(.*?)\s*\]\s*$/);

    if (match) {
        const url1 = match[1];
        const url2 = match[2];
        if (url2) {
            return [url1, url2];
        }
        return [url1, url1];
    }

    const trimmed = entry.trim();
    return [trimmed, trimmed];
}

export default splitUrl;
