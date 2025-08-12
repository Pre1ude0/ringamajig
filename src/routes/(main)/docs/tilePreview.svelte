<script lang="ts">
    import Tile from "$lib/components/tile.svelte";
    import prideFlags from "$lib/data/prideFlags.json";
    import {
        compileTilePreview,
        applyPrettyPrint,
    } from "$lib/utils/compilePreview";
    import { onMount } from "svelte";
    const form = $state({
        title: null,
        description: null,
        img: null,
        url: null,
        favicon: null,
        site_name: null,
        siteButton: null,
        themeColor: null,
        prideFlag: null,
    });
    const tileData = $derived({
        og: {
            "og:title": form.title || "",
            "og:description": form.description || "",
            "og:image": form.img || "",
            "og:url": form.url
                ? /^https?:\/\//i.test(form.url)
                    ? form.url
                    : /\./.test(form.url)
                      ? `https://${form.url}`
                      : form.url
                : "",
            "og:site_name": form.site_name || "",
        },
        "site-button": form.siteButton || "",
        "theme-color": form.themeColor || "",
        "pride-flag": form.prideFlag || "",
        favicon: form.favicon || "",
    });
    const requiredFields = ["og:title", "og:description", "og:image", "og:url"];

    let codePreviewContainer: HTMLElement | null = $state(null);
    onMount(() => {
        codePreviewContainer = document.getElementById("tile-code");
        form.themeColor = null;
    });

    $effect(() => {
        applyPrettyPrint(codePreviewContainer, compileTilePreview(tileData));
    });
</script>

<div class="container">
    <h3>Tile preview/builder</h3>
    <div class="tile-preview">
        <form class="left">
            <label for="title" class="required">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter your site title"
                bind:value={form.title}
            />
            <label for="url" class="required">Site url:</label>
            <input
                type="url"
                id="url"
                name="url"
                placeholder="https://example.com"
                bind:value={form.url}
            />
            <label for="description" class="required">Description:</label>
            <textarea
                id="description"
                name="description"
                placeholder="Enter a short description of your site"
                bind:value={form.description}
            ></textarea>
            <label for="img" class="required">Image URL:</label>
            <input
                type="url"
                id="img"
                name="img"
                placeholder="https://example.com/image.png"
                bind:value={form.img}
            />
            <label for="favicon">Favicon URL:</label>
            <input
                type="url"
                id="favicon"
                name="favicon"
                placeholder="https://example.com/favicon.ico"
                bind:value={form.favicon}
            />
            <label for="site_name">Site name:</label>
            <input
                type="text"
                id="site_name"
                name="site_name"
                placeholder="Enter your site name"
                bind:value={form.site_name}
            />
            <label for="site_button">Button image URL:</label>
            <input
                type="text"
                id="site_button"
                name="site_button"
                placeholder="https://example.com/button.png"
                bind:value={form.siteButton}
            />
            <label for="theme_color">Theme color:</label>
            <input
                type="color"
                id="theme_color"
                name="theme_color"
                placeholder="Enter a theme color"
                bind:value={form.themeColor}
            />
            <label for="pride_flag">Pride flag:</label>
            <select
                id="pride_flag"
                name="pride_flag"
                bind:value={form.prideFlag}
            >
                <option value="">None</option>
                {#each Object.keys(prideFlags) as flag}
                    <option value={flag}>{flag}</option>
                {/each}
            </select>
            <button
                type="reset"
                onclick={() => {
                    for (let key in form) {
                        (form as any)[key] = null;
                    }
                }}
                class="reset-button"
            >
                Clear
            </button>
        </form>
        <div class="right">
            <Tile index="?" pageName={null} pageData={tileData} />
            {#if requiredFields.some((field) => !(tileData as any).og[field]) && Object.values(form).some((v) => v)}
                <div class="warning">
                    <i class="nf nf-fa-warning"></i>
                    <span>Required fields missing!</span>
                </div>
            {/if}
            <pre class="tile-code prettyprint lang-html" id="tile-code"></pre>
        </div>
    </div>
</div>

<style>
    .tile-preview {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    label.required:before {
        content: "*";
        color: var(--required);
        margin-right: 5px;
    }

    .warning {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--error);
        font-size: 1.2em;
        margin-top: 10px;
    }

    .left {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 300px;

        #description {
            resize: none;
            height: fit-content;
            min-height: 100px;
        }
    }

    .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        width: 50%;

        .tile-code {
            height: fit-content;
            min-height: 200px;
            width: 100% !important;
            overflow-x: scroll;
            margin: 0;
            resize: none;
        }
    }

    @media screen and (max-width: 600px) {
        .tile-preview {
            flex-direction: column;
            align-items: center;
            gap: 30px;
        }

        .left {
            width: 100%;
        }

        .right {
            width: 100%;

            pre {
                margin: 0 1em 2em 1em !important;
                box-sizing: border-box;
            }
        }
    }
</style>
