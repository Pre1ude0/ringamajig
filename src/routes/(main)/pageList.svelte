<script lang="ts">
    import { getPageList } from "$lib/pages";
    import { onMount } from "svelte";
    import Tile from "./tile.svelte";

    let pageList: Array<string> = $state([]);
    $inspect(pageList);

    onMount(async () => {
        try {
            pageList = await getPageList();
        } catch (error) {
            console.error("Error fetching page list:", error);
        }
    });
</script>

<div>
    {#each pageList as url, i}
        <Tile index={i} pageName={url} />
    {/each}
</div>

<style>
    div {
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
        box-sizing: border-box;
        width: 100%;
        padding: 0 40px;
        font-size: 1.2em;
        color: var(--fg);
        list-style: none;
        margin: 0;
    }
</style>
