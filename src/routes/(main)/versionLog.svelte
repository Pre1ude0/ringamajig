<script lang="ts">
    import Markdown from "@magidoc/plugin-svelte-marked";
    import { onMount } from "svelte";

    let versionLog: string = $state("");
    let open: boolean = $state(false);

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

<div class="box" class:open>
    <h1 class="tag">Version Log</h1>
    <button onclick={() => (open = !open)} aria-label="Toggle visibility of log"
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

    :global(.open button) {
        transform: rotate(180deg);

        &:hover {
            transform: rotate(180deg) translateX(2px);
        }
    }

    h1.tag {
        text-align: right;
        color: var(--fg);
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

    :global(.box.open) {
        transform: translateY(0);
    }

    @media screen and (max-width: 600px) {
        .box {
            width: 70%;
            left: 15px;
            top: 0;
            transform: translateY(-90%);
            padding-right: 0;
            padding-bottom: 80px;

            transition:
                transform 0.3s ease-in-out,
                background-color 0.3s ease-in-out,
                border-color 0.3s ease-in-out,
                width 0.3s ease-in-out,
                left 0.3s ease-in-out;
        }

        :global(.box.open) {
            transform: translateY(0);
            box-sizing: border-box;
            width: 100%;
            left: 0;
        }

        h1.tag {
            top: auto;
            right: auto;
            aspect-ratio: unset;
            bottom: 15px;
            left: 20px;
            transform: rotate(0deg);
        }

        button {
            bottom: 10px;
            right: 10px;
            transform: rotate(90deg);
        }

        :global(.box.open button) {
            transform: rotate(-90deg);
        }

        .log {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            padding: 20px;
        }
    }
</style>
