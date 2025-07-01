<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import Logo from "$lib/Logo.svelte";

    let previous: string = $state("");
    let next: string = $state("");

    let currentPageUrl: string = $state("");
    let pageDisplay: string = $state("none");

    $inspect(currentPageUrl);

    let logoLean: string = $state("none");

    function leanLogo(direction: string, deg: string = "10"): void {
        if (direction == "left") {
            logoLean = `rotate(-${deg}deg)`;
        } else if (direction == "right") {
            logoLean = `rotate(${deg}deg)`;
        } else if (direction == "reset") {
            logoLean = "none";
        }
    }

    onMount(() => {
        if (window.self === window.top) {
            goto("/");
        }

        currentPageUrl = `${window.parent.location.protocol}//${window.parent.location.hostname}`;
        fetch("/api/get-neighbours", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: currentPageUrl }),
        })
            .then((response) => {
                if (!response.ok) {
                    pageDisplay = "none";
                    throw new Error("Network response was not ok");
                }
                return response;
            })
            .then((response) => response.json())
            .then((data) => {
                previous = data.previous;
                next = data.next;
                pageDisplay = "flex";
            })
            .catch((error) => {
                console.error("Error fetching neighbours:", error);
                pageDisplay = "none";
            });
    });
</script>

<div style="--display:{pageDisplay}">
    <a
        href={previous}
        target="_top"
        style="--hover-X: -5px"
        onmouseenter={() => {
            leanLogo("left");
        }}
        onmouseleave={() => {
            leanLogo("reset");
        }}>◀</a
    >
    <a href="https://ring.pre1ude.dev" target="_top">
        <Logo
            --width="100px"
            --hover-transform="scale(1.05)"
            --transform={logoLean}
        />
    </a>
    <a
        href={next}
        target="_top"
        style="--hover-X: 5px"
        onmouseenter={() => {
            leanLogo("right");
        }}
        onmouseleave={() => {
            leanLogo("reset");
        }}>▶</a
    >
</div>
{#if pageDisplay === "none"}
    <div
        style="display: flex; justify-content: center; align-items: center; height: 100vh;"
    >
        <p style="color: var(--fg); font-size: 24px;">
            {currentPageUrl}
        </p>
    </div>
{/if}

<style>
    :global(body) {
        background-color: transparent !important;
    }

    div {
        display: var(--display);

        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    a {
        &:after {
            content: none;
        }

        background-color: transparent;
        border: none;
        font-size: 40pt;
        font-weight: bold;
        cursor: pointer;
        color: var(--fg);
        height: 50px;
        line-height: 55px;
        transition:
            color 0.3s ease,
            transform 0.3s var(--overshoot);

        &:hover {
            transform: translateX(var(--hover-X));
            color: var(--primary);
        }
    }
</style>
