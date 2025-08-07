export function compilePreview(tile: any) {
    let preview: string = "";

    for (let i of Object.keys(tile.og)) {
        if (tile.og[i] === "") continue;
        preview += `\n<meta property="${i}" content="${tile.og[i]}">`;
    }
    for (let i of Object.keys(tile)) {
        if (i === "og" || i === "favicon" || tile[i] === "") continue;
        preview += `\n<meta name="${i}" content="${tile[i]}">`;
    }
    if (tile.favicon) {
        preview += `\n<link rel="icon" href="${tile.favicon}">`;
    }

    if (!preview) {
        preview =
            "Write something in the fields to the left and it'll appear on the preview above aswell as in html format here for you to copy!";
    } else {
        preview = `<!-- Put this in the <head> of your html -->${preview}`;
    }
    return preview;
}
