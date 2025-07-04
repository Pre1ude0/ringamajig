import * as cheerio from "cheerio";

export async function checkPageValidity(
    url: string,
    fetch: typeof globalThis.fetch,
): Promise<boolean> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return false;
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        let sources: Array<string> = [];

        $("iframe").each((_, iframe) => {
            const src = $(iframe).attr("src");
            if (src && src.startsWith("https://ring.pre1ude.dev/ring")) {
                sources.push(src);
            }
        });

        if (sources.length === 0) return false;

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
