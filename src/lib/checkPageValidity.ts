import { pullCheerio, pullPuppeteer } from "./pullPageContent";

export async function checkPageValidity(
    url: string,
    fetch: typeof globalThis.fetch,
): Promise<boolean> {
    try {
        if (!url || typeof url !== "string") {
            console.error("Invalid URL provided:", url);
            return false;
        }

        let sources: Array<string> | null = await pullCheerio(url, fetch);
        if (sources === null) {
            console.warn("Cheerio failed, trying Puppeteer for: " + url);
            sources = await pullPuppeteer(url);
            if (sources === null || sources.length === 0) {
                console.warn("No valid sources found for:", url);
                return false;
            }
        }

        for (let src of sources) {
            let urlObj = new URL(src);
            if (
                !(urlObj.hostname === "ring.pre1ude.dev") ||
                !(urlObj.pathname === "/ring")
            )
                continue;

            let params = new URLSearchParams(urlObj.search);
            if (!params.has("url") || params.has("test")) continue;

            let pageUrl = params.get("url")?.replace(/\/$/, "");
            if (pageUrl === url) return true;
        }

        return false;
    } catch (e) {
        return false;
    }
}
