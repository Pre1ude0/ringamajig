<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import Logo from "$lib/Logo.svelte";
    import { blur } from "svelte/transition";
</script>

{#if !(page.url.pathname == "/")}
    <button
        id="home"
        onclick={() => {
            goto("/");
        }}
        transition:blur={{ duration: 200 }}><Logo --width="70px" /></button
    >
{/if}

<style>
    button {
        cursor: pointer;
        position: absolute;
        left: 17px;
        top: 20px;
        background: none;
        border: none;
        transition: transform 0.3s var(--overshoot);

        &:hover {
            transform: rotate(-10deg);
        }
    }
</style>
