import { json } from "@sveltejs/kit";
import { checkPageValidity } from "$lib/checkPageValidity";
import * as cheerio from "cheerio";

export const POST = async ({ request, fetch }) => {
    try {
        const { url } = await request.json();

        if (!url || typeof url !== "string") {
            return json({ error: "Invalid or missing URL." }, { status: 400 });
        }

        let isValid = false;
        for (let i = 0; i < 3; i++) {
            isValid = await checkPageValidity(url, fetch);
            if (isValid) break;
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
        }

        const res = await fetch(url);
        if (!res.ok) {
            return json(
                { error: `Failed to fetch page: ${res.statusText}` },
                { status: res.status },
            );
        }

        const html = await res.text();
        const $ = cheerio.load(html);

        const og: Record<string, string> = {};
        $('meta[property^="og:"]').each((_, el) => {
            const property = $(el).attr("property");
            const content = $(el).attr("content");
            if (property && content) {
                og[property] = content;
            }
        });

        if (!og["og:site_name"]) {
            og["og:site_name"] = url.replace(/^https?:\/\//, "");
        }

        const themeColor =
            $('meta[name="theme-color"]').attr("content") || null;

        const prideFlag = $('meta[name="pride-flag"]').attr("content") || null;

        return json({
            og,
            themeColor,
            prideFlag,
        });
    } catch (err) {
        console.error(err);
        return json({ error: "Server error occurred." }, { status: 500 });
    }
};
