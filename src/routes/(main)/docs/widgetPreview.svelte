<script lang="ts">
    import {
        applyPrettyPrint,
        compileWidgetPreview,
    } from "$lib/utils/compilePreview";
    let params = $state({
        url: "",
        test: true,
        fgcolor: null,
        bgcolor: null,
        animdur: null,
    });
    $inspect(params);

    let codePreviewContainer: HTMLElement | null = null;
    let widgetPreview: HTMLIFrameElement | null = null;
    let widgetUrl: string = $state("https://ring.pre1ude.dev/ring");
    $inspect(widgetUrl);
    import { onMount } from "svelte";
    onMount(() => {
        codePreviewContainer = document.getElementById("widget-code");
        widgetPreview = document.querySelector(".widget iframe");
    });

    $effect(() => {
        let widgetUrl = compileWidgetPreview(params);
        applyPrettyPrint(codePreviewContainer, widgetUrl);
        if (widgetPreview) {
            widgetPreview.src = widgetUrl;
        }
    });
</script>

<div class="container">
    <h3>Widget preview/builder</h3>
    <div class="widget-preview">
        <form class="left">
            <label for="url" class="required">URL:</label>
            <input
                type="text"
                id="url"
                bind:value={params.url}
                placeholder="https://example.com"
                required
            />
            <label for="test">Test mode:</label>
            <input
                type="checkbox"
                id="test"
                bind:checked={params.test}
                name="Enable test mode"
            />
            <label for="fgcolor">Foreground Color:</label>
            <input type="color" id="fgcolor" bind:value={params.fgcolor} />
            <label for="bgcolor">Background Color:</label>
            <input type="color" id="bgcolor" bind:value={params.bgcolor} />
            <label for="animdur">Animation Duration (ms):</label>
            <input
                type="number"
                id="animdur"
                bind:value={params.animdur}
                placeholder="1000"
            />
        </form>
        <div class="right">
            <div class="widget">
                <iframe
                    src={widgetUrl}
                    width="100%"
                    height="100%"
                    frameborder="0"
                    title="Widget Preview"
                ></iframe>
            </div>
            <pre class="widget-code prettyprint lang-html"></pre>
        </div>
    </div>
</div>

<style>
    .widget-preview {
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

        /*#description {
            resize: none;
            height: fit-content;
            min-height: 100px;
        }*/
    }

    .right {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        width: 50%;

        .widget-code {
            height: fit-content;
            min-height: 200px;
            width: 100% !important;
            overflow-x: scroll;
            margin: 0;
            resize: none;
        }
    }

    @media screen and (max-width: 600px) {
        .widget-preview {
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
