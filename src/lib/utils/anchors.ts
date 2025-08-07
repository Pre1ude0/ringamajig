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
            highlightActiveAnchor();
        });
    });

    window.addEventListener("hashchange", highlightActiveAnchor);
}

export function highlightActiveAnchor() {
    const anchors = document.querySelectorAll("h1[id], h2[id], h3[id]");
    const hash = window.location.hash;

    anchors.forEach((anchor) => {
        if (anchor.id === hash.slice(1)) {
            anchor.classList.add("anchored");
        } else {
            anchor.classList.remove("anchored");
        }
    });
}
