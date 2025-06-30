import { json } from "@sveltejs/kit";

async function getNeighours(
    url: string,
    fetch: typeof globalThis.fetch,
): Promise<string[]> {
    let pages: Array<string> = await fetch("/pages.txt")
        .then((response) => response.text())
        .then((data) => {
            const pages = data
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line);

            if (!pages.includes(url)) {
                console.error("URL not found in pages.txt");
                return [];
            }

            let pageIndex = pages.indexOf(url);

            let previous = pages[pageIndex - 1] || pages[pages.length - 1];
            let next = pages[pageIndex + 1] || pages[0];

            return [previous, next];
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
