export function resetCopyButton(this: HTMLElement) {
    const button = this.querySelector(".copy-button");
    if (button) {
        setTimeout(() => {
            this.addEventListener("mouseleave", () => {
                setTimeout(() => {
                    button.innerHTML = "<i class='nf nf-oct-copy'></i>";
                }, 150);
            });
        }, 2000);
    }
}

export function addCopyButtons() {
    document.querySelectorAll("pre").forEach((pre) => {
        const button = document.createElement("button");
        button.innerHTML = "<i class='nf nf-oct-copy'></i>";
        button.classList.add("copy-button");
        button.addEventListener("click", () => {
            navigator.clipboard
                .writeText(pre.textContent || "")
                .then(() => {
                    button.innerHTML = "<i class='nf nf-oct-check'></i>";
                    resetCopyButton.call(pre);
                })
                .catch((err) => {
                    console.error("Failed to copy text: ", err);
                });
        });
        pre.appendChild(button);
    });
}
