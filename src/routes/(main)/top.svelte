<script lang="ts">
    import Logo from "$lib/Logo.svelte";
    import { blur } from "svelte/transition";

    let headerEl: HTMLHeadingElement;
    let logoTransformState = $state("none");
    let descriptionTransformState = $state("none");
    let logoTarget = "translateX(30px) scale(1.1) rotate(-15deg)";
    let descriptionTarget = "translateY(10px)";

    function resetAnimation() {
        if (headerEl.classList.contains("sliced")) {
            headerEl.classList.remove("sliced");
            void headerEl.offsetWidth;
        }

        setTimeout(() => {
            logoTransformState = logoTarget;
            descriptionTransformState = descriptionTarget;
            headerEl.classList.add("sliced");
        }, 0);
    }

    function resetLogo() {
        logoTransformState = "none";
        descriptionTransformState = "none";
    }
</script>

<div class="parent" in:blur={{ duration: 200 }}>
    <div class="child">
        <h1
            bind:this={headerEl}
            onmouseenter={resetAnimation}
            onmouseleave={resetLogo}
        >
            Ring-amajig
        </h1>
        <h2 style="transform: {descriptionTransformState}">
            Yet another <a
                target="_blank"
                href="https://en.wikipedia.org/wiki/Webring">webring</a
            > on the www
        </h2>
    </div>
    <Logo
        --width="250px"
        --transform={logoTransformState}
        --hover-transform="rotate(10deg)"
    />
</div>

<style>
    @keyframes slice {
        from {
            background-position: 0% 50%;
        }
        to {
            background-position: 100% 50%;
        }
    }

    :global(.sliced) {
        animation: slice 0.7s 0.3s ease-out forwards !important;
    }

    h1 {
        font-size: 5em;
        margin: 0;
        cursor: pointer;

        -webkit-text-fill-color: var(--fg);
        -webkit-background-clip: text;
        background-clip: text !important;
        color: transparent;

        transition:
            transform 0.3s var(--overshoot),
            background-size 0.3s ease-out,
            -webkit-text-fill-color 0.3s ease-out;

        background:
            linear-gradient(
                100deg,
                transparent 0%,
                transparent 45%,
                gray 45%,
                gray 55%,
                transparent 55%,
                transparent 100%
            ),
            var(--fg);

        background-size: 300% 100%;
        animation: none;
    }

    h1:hover {
        -webkit-text-fill-color: transparent;
        transform: skewX(-10deg) scale(1.1);
    }

    h2 {
        font-size: 1.7em;
        margin: 0;
        transition: transform 0.3s var(--overshoot);
    }

    .parent {
        display: flex;
        flex-direction: row;
        gap: 15px;
        align-items: center;
        justify-content: center;
        padding: 50px;
    }

    .child {
        padding: 2em 0;
        /* gap: 5px; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 600px) {
        h1 {
            font-size: 3em;
        }
        h2 {
            font-size: 1.2em;
        }

        .parent {
            margin-top: 50px;
            flex-direction: column-reverse;
            gap: 0;

            .child {
                padding: 0;
            }
        }
    }
</style>
