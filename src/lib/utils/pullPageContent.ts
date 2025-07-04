import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

export async function pullCheerio(
    url: string,
    fetch: typeof globalThis.fetch,
): Promise<Array<string> | null> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            return null;
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

        if (sources.length === 0) return null;

        return sources;
    } catch (error) {
        console.error("Error fetching page:", error);
        return null;
    }
}

export async function pullPuppeteer(
    url: string,
): Promise<Array<string> | null> {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2", timeout: 3000 });

        const sources = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("iframe"))
                .map((iframe) => iframe.getAttribute("src"))
                .filter(
                    (src): src is string =>
                        !!src &&
                        src.startsWith("https://ring.pre1ude.dev/ring"),
                );
        });

        await browser.close();

        if (sources.length === 0) return null;

        return sources;
    } catch (error) {
        console.error("Error fetching page with Puppeteer:", error);
        return null;
    }
}
