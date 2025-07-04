import { checkPageValidity } from "$lib/checkPageValidity.js";
import { json } from "@sveltejs/kit";

async function getNeighours(
    url: string,
    fetch: typeof globalThis.fetch,
): Promise<string[]> {
    let pages: Array<string> = await fetch("/pages.txt")
        .then((response) => response.text())
        .then(async (data) => {
            const pages = data
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line);

            if (!pages.includes(url)) {
                console.error("URL not found in pages.txt");
                return [];
            }

            let pageIndex = pages.indexOf(url);

            let previousIndex = pageIndex - 1;
            let nextIndex = pageIndex + 1;

            for (let i = previousIndex; i >= 0; i--) {
                if (i < 0) {
                    i = pages.length - 1;
                }
                if (await checkPageValidity(pages[i])) {
                    previousIndex = i;
                    break;
                }
            }

            for (let i = nextIndex; i < pages.length; i++) {
                if (i >= pages.length) {
                    i = 0;
                }
                if (await checkPageValidity(pages[i])) {
                    nextIndex = i;
                    break;
                }
            }

            return [pages[previousIndex], pages[nextIndex]];
        })
        .catch((error) => {
            console.error("Error fetching pages:", error);
            return [];
        });
    return pages;
}

export const POST = async ({ request, fetch }) => {
    let url = await request.json().then((data) => data.url);
    console.log(url);

    if (!url || typeof url !== "string") {
        return json({ error: "Invalid or missing URL." }, { status: 400 });
    }

    let neighbours = await getNeighours(url, fetch);

    if (neighbours.length === 0) {
        return json({ error: "No neighbours found." }, { status: 404 });
    }

    return json({
        previous: neighbours[0],
        next: neighbours[1],
    });
};
