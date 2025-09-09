import * as cheerio from "cheerio";
import puppeteer, { Browser } from "puppeteer";

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

let browserPromise: Promise<Browser> | null = null;

async function getBrowser(): Promise<Browser> {
    if (!browserPromise) {
        browserPromise = puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
    }
    return browserPromise;
}

export async function pullPuppeteer(url: string) {
    const browser = await getBrowser();
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 8000 });
        const sources = await page.evaluate(() =>
            Array.from(document.querySelectorAll("iframe"))
                .map((i) => i.getAttribute("src"))
                .filter(
                    (src): src is string =>
                        !!src &&
                        src.startsWith("https://ring.pre1ude.dev/ring"),
                ),
        );
        return sources.length ? sources : null;
    } finally {
        await page.close().catch(() => {});
    }
}

// Optional graceful shutdown hook
process.on("beforeExit", async () => {
    if (browserPromise) {
        try {
            const b = await browserPromise;
            await b.close();
        } catch {}
    }
});
