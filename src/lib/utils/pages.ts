export async function getOpenGraphData(url: string): Promise<any> {
    const response = await fetch("/api/fetch-metadata", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return await response.json();
}

export function getPageList(): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
        fetch("pages.txt")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((pagesTxt) => {
                let pages = pagesTxt
                    .split("\n")
                    .filter((page) => page.trim() !== "");

                resolve(pages);
            })
            .catch((error) => {
                console.error("Error fetching pages.txt:", error);
                reject(error);
            });
    });
}

export function trunicate(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength - 3) + "...";
}
