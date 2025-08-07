<script lang="ts">
    import { onMount } from "svelte";
    import Heading from "./heading.svelte";
    import Guidelines from "./guidelines.svelte";
    import MetaTags from "./metaTags.svelte";
    import Footer from "./footer.svelte";
    import Iframe from "./iframe.svelte";
    import PrideFlags from "./prideFlags.svelte";
    import TilePreview from "./tilePreview.svelte";
    import { addCopyButtons } from "$lib/utils/codeBlock";

    onMount(() => {
        if (window.PR) {
            window.PR.prettyPrint();
        }
        addCopyButtons(document.body);
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/prettify.css" />
    <link rel="stylesheet" href="/styles/docs.css" />
    <script
        src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"
    ></script>
    <link rel="stylesheet" href="/styles/gaydients.css" />
</svelte:head>

<div class="view">
    <Heading />
    <Guidelines />
    <MetaTags />
    <TilePreview />
    <Iframe />
    <Footer />
    <PrideFlags />
</div>
