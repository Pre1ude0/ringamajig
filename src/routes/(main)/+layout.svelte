<script>
    import DarkToggle from "$lib/components/DarkToggle.svelte";
    import ReturnHome from "$lib/components/returnHome.svelte";
    import Notifications from "$lib/components/notifications.svelte";
</script>

<svelte:head>
    <style>
        .site-body-display {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
    </style>
</svelte:head>

<ReturnHome />
<DarkToggle />
<Notifications />
<slot />
<div style="flex-grow: 1"></div>
<div class="bar">
    <p>
        Powered by <i class="nf nf-fa-heart" id="heart" title="love"></i> and
        <i class="nf nf-dev-svelte" id="svelte" title="svelteKit"></i>
    </p>
    <div class="divider line"></div>
    <div class="links">
        <a href="/docs#how-do-i-join-you-supposedly">How to join</a>
        <div class="divider dot"></div>
        <a href="/docs">Docs</a>
        <div class="divider dot"></div>
        <a href="/why">Why?</a>
        <div class="divider dot"></div>
        <a href="https://github.com/Pre1ude0/ringamajig" target="_blank"
            >Source code</a
        >
    </div>
</div>

<style>
    .bar {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: fit-content;
        padding: 30px 10px;
        background-color: black;
        color-scheme: dark;

        p {
            text-align: center;
            color: white;
            text-indent: 0;
            margin: 0;
        }

        a {
            text-align: center;
        }
    }

    .links {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: fit-content;
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

    @media screen and (max-width: 600px) {
        .bar {
            flex-direction: column;
            align-items: center;
            padding: 20px;
            font-size: 1.1em;
        }
        .divider.line {
            width: 40px;
            height: 1px;
            margin: 10px 0;
        }
    }
</style>
