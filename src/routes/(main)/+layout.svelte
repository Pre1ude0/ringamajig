<script>
    import DarkToggle from "$lib/DarkToggle.svelte";
    import ReturnHome from "$lib/returnHome.svelte";
</script>

<ReturnHome />
<DarkToggle />
<slot />
<div style="flex-grow: 1"></div>
<div class="container">
    <p>
        Powered by <i class="nf nf-fa-heart" id="heart" title="love"></i> and
        <i class="nf nf-dev-svelte" id="svelte" title="svelteKit"></i>
    </p>
    <div class="divider line"></div>
    <a href="/docs#how-to-join">How to join</a>
    <div class="divider dot"></div>
    <a href="/docs">Docs</a>
    <div class="divider dot"></div>
    <a href="/why">Why?</a>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: fit-content;
        padding: 10px;
        background-color: black;
        color-scheme: dark;

        p {
            text-align: center;
            color: white;
        }
    }

    .divider {
        &.line {
            width: 1px;
            height: 20px;
            margin: 0 10px;
        }
        &.dot {
            width: 3px;
            height: 3px;
            border-radius: 50%;
            margin: 0 5px;
        }
        background-color: white;
    }

    #svelte {
        color: #f96743;
    }

    #heart {
        color: #ff246d;
    }
</style>
