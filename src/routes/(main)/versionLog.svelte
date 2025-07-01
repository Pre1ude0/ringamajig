<script lang="ts">
    import Markdown from "@magidoc/plugin-svelte-marked";
    import { onMount } from "svelte";

    let versionLog: string = $state("");

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

<div class="box">
    <h1>Version Log</h1>
    <div class="log">
        <Markdown source={versionLog} />
    </div>
</div>

<style>
    h1 {
        text-align: right;
        margin: 10px 20px;
        position: absolute;
        top: 0;
        right: 0;
        transform: rotate(90deg) translateY(-182%) translateX(50%);
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

        transition: transform 0.15s var(--overshoot);
        &:hover {
            transform: translateY(0);
        }
    }
</style>
