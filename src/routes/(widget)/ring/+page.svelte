<script lang="ts">
    import { onMount } from "svelte";
    import { blur } from "svelte/transition";
    import { goto } from "$app/navigation";
    import Logo from "$lib/components/Logo.svelte";

    let hexRegex6digit = /^[0-9A-F]{6}$/i;
    let hexRegex3digit = /^[0-9A-F]{3}$/i;

    let previous: string = $state("");
    let next: string = $state("");

    let currentPageUrl: string = $state("");
    let showPage: boolean = $state(false);
    let custVal: any = $state({});
    let testMode: boolean = $state(false);

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

    function setBodyBg(color: string) {
        document.body.style.backgroundColor = color;
    }

    onMount(() => {
        if (window.self === window.top) {
            goto("/");
            return;
        }

        function isColor(strColor: string) {
            var s = new Option().style;
            s.color = strColor;
            return s.color == strColor;
        }

        currentPageUrl =
            new URL(window.location.href).searchParams.get("url") || "";
        currentPageUrl = currentPageUrl.replace(/\/$/, ""); // Remove trailing slash

        testMode =
            new URL(window.location.href).searchParams.get("test") === "true";

        custVal = {
            bgcolor: new URL(window.location.href).searchParams.get("bgcolor"),
            fgcolor: new URL(window.location.href).searchParams.get("fgcolor"),
            animdur:
                new URL(window.location.href).searchParams.get("animdur") ||
                "500",
        };

        if (!isColor(custVal.bgcolor)) {
            if (
                !hexRegex6digit.test(custVal.bgcolor) &&
                !hexRegex3digit.test(custVal.bgcolor)
            ) {
                custVal.bgcolor = "var(--bg)";
            } else {
                custVal.bgcolor = `#${custVal.bgcolor}`;
            }
        }

        if (!isColor(custVal.fgcolor)) {
            if (
                !hexRegex6digit.test(custVal.fgcolor) &&
                !hexRegex3digit.test(custVal.fgcolor)
            ) {
                custVal.fgcolor = "var(--fg)";
            } else {
                custVal.fgcolor = `#${custVal.fgcolor}`;
            }
        }

        setBodyBg(custVal.bgcolor);

        if (testMode) {
            showPage = true;
            next = "/";
            previous = "/";
        } else {
            fetch("/api/get-neighbours", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: currentPageUrl }),
            })
                .then((response) => {
                    if (!response.ok) {
                        showPage = false;
                        throw new Error("Network response was not ok");
                    }
                    return response;
                })
                .then((response) => response.json())
                .then((data) => {
                    previous = data.previous;
                    next = data.next;
                    showPage = true;
                })
                .catch((error) => {
                    console.error("Error fetching neighbours:", error);
                    showPage = false;
                });
        }
    });
</script>

<div
    style="
        --cust-bg: {custVal.bgcolor};
        --cust-fg: {custVal.fgcolor};
        "
>
    {#if showPage}
        <a
            href={previous}
            target="_top"
            style="--hover-X: -5px"
            onmouseenter={() => {
                leanLogo("left");
            }}
            onmouseleave={() => {
                leanLogo("reset");
            }}
            in:blur={{ duration: custVal.animdur }}>◀</a
        >
    {/if}
    <a
        href="https://ring.pre1ude.dev"
        target="_top"
        data-watermark={testMode}
        in:blur={{ duration: custVal.animdur }}
    >
        <Logo
            --width="100px"
            --hover-transform="scale(1.05)"
            --transform={logoLean}
            --transitions="none"
            --color={custVal.fgcolor || "var(--fg)"}
        />
    </a>
    {#if showPage}
        <a
            href={next}
            target="_top"
            style="--hover-X: 5px"
            onmouseenter={() => {
                leanLogo("right");
            }}
            onmouseleave={() => {
                leanLogo("reset");
            }}
            in:blur={{ duration: custVal.animdur }}>▶</a
        >
    {/if}
</div>

<style>
    :global(body) {
        height: 100% !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;

        display: flex;
        align-items: center;
        justify-content: center;
        transition: none;
    }

    div {
        display: flex;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: flex-start;
        gap: 10px;
        padding: 10px;

        background-color: var(--cust-bg, var(--bg));
    }

    a {
        &:after {
            content: none;
        }

        &[data-watermark="true"]:before {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            z-index: 10;
            content: "Test mode";
            position: absolute;
            top: 0;
            left: -20%;
            bottom: 0;
            padding-bottom: 10px;
            right: -20%;
            font-size: 25px;
            color: var(--cust-bg, var(--bg));
            filter: contrast(0.5);
            pointer-events: none;
        }

        border: none;
        font-size: 40pt;
        font-weight: bold;
        cursor: pointer;
        position: relative;

        color: var(--cust-fg, var(--fg));

        height: fit-content;
        line-height: 55px;
        transition: transform 0.3s var(--overshoot);

        &:hover {
            transform: translateX(var(--hover-X));
        }
    }
</style>
