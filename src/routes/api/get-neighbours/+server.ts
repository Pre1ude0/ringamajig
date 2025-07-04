import { checkPageValidity } from "$lib/checkPageValidity.js";
import { json } from "@sveltejs/kit";

async function getNeighours(
    url: string,
    fetch: typeof globalThis.fetch,
): Promise<string[]> {
    try {
        const response = await fetch("/pages.txt");
        const data = await response.text();
        const pages = data
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line);

        if (!pages.includes(url)) {
            console.error("URL not found in pages.txt");
            return [];
        }

        let pageIndex = pages.indexOf(url);

        // Find previous valid neighbour
        let previous: string;
        for (let i = pageIndex - 1; ; i--) {
            if (i < 0) i = pages.length - 1; // Wrap around to the end

            if (pages[i] && (await checkPageValidity(pages[i], fetch))) {
                previous = pages[i];
                break;
            }
        }

        // Find next valid neighbour
        let next: string;
        for (let i = pageIndex + 1; ; i++) {
            if (i >= pages.length) i = 0; // Wrap around to the start

            if (pages[i] && (await checkPageValidity(pages[i], fetch))) {
                next = pages[i];
                break;
            }
        }

        return [previous, next];
    } catch (error) {
        console.error("Error fetching pages:", error);
        return [];
    }
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
