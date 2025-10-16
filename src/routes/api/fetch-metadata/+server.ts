import { json } from "@sveltejs/kit";
import { checkPageValidity } from "$lib/utils/checkPageValidity";
import * as cheerio from "cheerio";

export const POST = async ({ request, fetch }) => {
    try {
        const { url } = await request.json();

        if (!url || typeof url !== "string") {
            return json({ error: "Invalid or missing URL." }, { status: 400 });
        }

        if (!(await checkPageValidity(url, fetch))) {
            return json(
                {
                    error: `Page invalid: ${url}`,
                },
                { status: 400 },
            );
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
        $('meta[property^="og:"], meta[name^="og:"]').each((_, el) => {
            const property = $(el).attr("property");
            const name = $(el).attr("name");
            const key = property || name;
            const content = $(el).attr("content");
            if (key && content) {
                og[key] = content;
            }
        });

        if (!og["og:site_name"]) {
            og["og:site_name"] = url.replace(/^https?:\/\//, "");
        }

        const metaVarsToGet = ["theme-color", "pride-flag", "site-button"];
        const meta: Record<string, string | null> = {};

        for (const name of metaVarsToGet) {
            const metaTagByName = $(`meta[name="${name}"]`);
            const metaTagByProperty = $(`meta[property="${name}"]`);

            let content: string | null = null;

            if (metaTagByName.length) {
                content = metaTagByName.attr("content") || null;
            } else if (metaTagByProperty.length) {
                content = metaTagByProperty.attr("content") || null;
            } else {
                content = null;
            }

            meta[name] = content;
        }

        let favicon: string | null = null;
        const faviconHref = $("link[rel='icon']").attr("href");
        if (faviconHref) {
            if (/^(https?:)?\/\//.test(faviconHref)) {
                favicon = faviconHref;
            } else {
                const baseUrl = url.replace(/\/+$/, "");
                favicon = `${baseUrl}${faviconHref.startsWith("/") ? "" : "/"}${faviconHref}`;
            }
        }

        if (
            meta["site-button"] &&
            !/^(https?:)?\/\//.test(meta["site-button"])
        ) {
            const baseUrl = url.replace(/\/+$/, "");
            meta["site-button"] =
                `${baseUrl}${meta["site-button"]!.startsWith("/") ? "" : "/"}${meta["site-button"]}`;
        }

        if (og["og:image"] && !/^(https?:)?\/\//.test(og["og:image"])) {
            const baseUrl = url.replace(/\/+$/, "");
            og["og:image"] =
                `${baseUrl}${og["og:image"].startsWith("/") ? "" : "/"}${og["og:image"]}`;
        }

        if (!favicon) {
            const strippedUrl = url.replace(/\/+$/, "");
            let staticIcon = await fetch(`${strippedUrl}/favicon.ico`);
            if (staticIcon.ok) {
                favicon = `${strippedUrl}/favicon.ico`;
            }
        }

        const requiredFields = [
            "og:title",
            "og:description",
            "og:image",
            "og:url",
        ];
        for (const field of requiredFields) {
            if (!og[field]) {
                return json(
                    {
                        error: `Page does not contain required metadata: ${field}`,
                    },
                    { status: 406 },
                );
            }
            if (field === "og:image") {
                try {
                    new URL(og[field]);
                } catch {
                    return json(
                        {
                            error: `Invalid URL in metadata: ${field}`,
                        },
                        { status: 406 },
                    );
                }
            }
        }

        return json({
            og,
            themeColor: meta["theme-color"],
            prideFlag: meta["pride-flag"],
            siteButton: meta["site-button"],
            favicon,
        });
    } catch (err) {
        console.error(err);
        return json({ error: "Server error occurred." }, { status: 500 });
    }
};
