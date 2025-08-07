export function addAnchors(node: HTMLElement) {
    const headers = node.querySelectorAll("h1, h2, h3");
    headers.forEach((header) => {
        // Generate a slug/id from the header text
        const slug = header.textContent
            ?.toLowerCase()
            .replace(/[^\w]+/g, "-")
            .replace(/^-+|-+$/g, "");
        if (!slug) return;

        header.id = slug;

        header.addEventListener("click", () => {
            window.location.hash = slug;
        });
    });
}
