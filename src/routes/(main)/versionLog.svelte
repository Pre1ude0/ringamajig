<script lang="ts">
    import Markdown from "@magidoc/plugin-svelte-marked";
    import { onMount } from "svelte";

    let versionLog: string = $state("");
    let close: boolean = $state(false);

    onMount(async () => {
        try {
            versionLog = await fetch("updateLog.md").then((response) =>
                response.text(),
            );
        } catch (error) {
            console.error("Error fetching version log:", error);
        }
    });
</script>

<div class="box" class:close>
    <h1 class="tag">Version Log <i class="nf nf-md-book tag"></i></h1>
    <button
        onclick={() => (close = !close)}
        aria-label="Toggle visibility of log"
        ><i class="nf nf-seti-play_arrow"></i></button
    >

    <div class="log">
        <Markdown source={versionLog} />
    </div>
</div>

<style>
    button {
        position: absolute;
        bottom: 5px;
        right: 5px;
        background-color: transparent;
        border: none;
        color: var(--fg);
        cursor: pointer;
        font-size: 2rem;
        padding: 10px;
        transition:
            color 0.3s,
            transform 0.15s var(--overshoot);

        &:hover {
            color: var(--accent);
            transform: translateX(2px);
        }
    }

    :global(button.close) {
        transform: rotate(180deg);

        &:hover {
            transform: rotate(180deg) translateX(2px);
        }
    }

    h1.tag {
        text-align: right;
        margin: 0;
        padding: 0;
        position: absolute;
        top: 20px;
        right: 7px;
        aspect-ratio: 1 / 1;
        transform: rotate(90deg);
        pointer-events: none;
    }

    .log {
        width: 400px;
        height: 500px;
        padding: 10px;

        overflow-y: scroll;
    }

    :global(.log li) {
        list-style-type: "-";
        padding-left: 5px;
    }

    :global(.log ul) {
        padding-left: 20px;
    }

    .box {
        position: absolute;
        bottom: 10vh;
        left: 10px;
        z-index: 1000;
        padding-right: 50px;

        transform: translateX(calc(-100% + 55px));
        border: 1px solid var(--fg);
        background-color: var(--bg);
        border-radius: var(--border-radius);

        transition:
            transform 0.15s var(--overshoot),
            background-color 0.3s ease-in-out,
            border-color 0.3s ease-in-out;
    }

    :global(.box.close) {
        transform: translateY(0);
    }
</style>
