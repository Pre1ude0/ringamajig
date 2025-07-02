<script lang="ts">
    import { onMount } from "svelte";
    import { blur, fly } from "svelte/transition";

    let currentPageUrl: string = $state("");
    let strippedUrl: string = $state("");

    onMount(() => {
        currentPageUrl = window.location.origin;
        strippedUrl = window.location.host;
    });
</script>

<div class="view">
    <div class="container">
        <h1 in:blur={{ duration: 500, delay: 0 }}>Why?</h1>
        <h2 in:fly={{ y: 150, duration: 500, delay: 100 }}>
            "Why a <a
                target="_blank"
                href="https://en.wikipedia.org/wiki/Webring">webring</a
            >?"
            <span
                style="font-size: 0.7em; font-weight: normal;"
                in:fly={{ y: 150, duration: 500, delay: 200 }}
                >- you may ask</span
            >
        </h2>

        <p in:fly={{ y: 150, duration: 500, delay: 300 }}>
            Well since summer had started I had a lot more free time on my hands
        </p>
        <p in:fly={{ y: 150, duration: 500, delay: 400 }}>
            And what better way to relax from school than to learn something new
            while doing a fun project for you and your friends in the process?
        </p>
        <p in:fly={{ y: 150, duration: 500, delay: 500 }}>
            So I decided to make a webring, not only because I wanted to learn a
            modern web framework like <a
                target="_blank"
                href="https://svelte.dev/">SvelteKit</a
            >, but also because I've started to browse the indie web more,
            specifically
            <a href="https://neocities.org/browse" target="_blank">Neocities</a>
            pages as one of my best friends had one themselves.
        </p>
        <p in:fly={{ y: 150, duration: 500, delay: 600 }}>
            One of the things I noticed was that many of these pages were part
            of a webring, sometimes even multiple. I thought it was a pretty
            interesting concept, and wanted to try making one for myself!
        </p>
        <p in:fly={{ y: 150, duration: 500, delay: 700 }}>
            So if you're reading this on <a
                href={currentPageUrl}
                target="_blank">{strippedUrl}</a
            >, that means I succeeded and have a silly little webring of my own!
            If this message has inspired you to join my webring, please do by
            checking out the <a href="/docs#how-to-join">How to join</a> page first!
        </p>
    </div>
</div>

<style>
    .view {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }

    .container {
        width: 100%;
        max-width: 800px;
        min-height: 100vh;
    }

    h1 {
        font-size: 7em;
        margin-bottom: 0;
    }

    h2 {
        font-size: 2em;
        margin-top: 0.5em;
        margin-bottom: 0;
    }

    p {
        white-space-collapse: collapse;
        font-size: 1.2em;
        text-indent: 2em;
        line-height: 1.5;
    }

    @media screen and (max-width: 600px) {
        .container {
            width: 100%;
            box-sizing: border-box;
            padding: 20px;
        }

        h1 {
            font-size: 4em;
        }

        h2 {
            font-size: 1.5em;
        }

        p {
            font-size: 1em;
        }
    }
</style>
