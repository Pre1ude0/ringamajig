<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Logo from "$lib/Logo.svelte";

    let hexRegex6digit = /^[0-9A-F]{6}$/i;
    let hexRegex3digit = /^[0-9A-F]{3}$/i;

    let previous: string = $state("");
    let next: string = $state("");

    let currentPageUrl: string = $state("");
    let showPage: boolean = $state(false);
    let customValues: any = $state({});
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
        // if (window.self === window.top) {
        //     goto("/");
        //     return;
        // }

        function isColor(strColor: string) {
            var s = new Option().style;
            s.color = strColor;
            return s.color == strColor;
        }

        currentPageUrl =
            new URL(window.location.href).searchParams.get("url") || "";

        testMode =
            new URL(window.location.href).searchParams.get("test") === "true";

        customValues = {
            bgcolor: new URL(window.location.href).searchParams.get("bgcolor"),
            fgcolor: new URL(window.location.href).searchParams.get("fgcolor"),
        };

        if (!isColor(customValues.bgcolor)) {
            if (
                !hexRegex6digit.test(customValues.bgcolor) &&
                !hexRegex3digit.test(customValues.bgcolor)
            ) {
                customValues.bgcolor = "var(--bg)";
            } else {
                customValues.bgcolor = `#${customValues.bgcolor}`;
            }
        }

        if (!isColor(customValues.fgcolor)) {
            if (
                !hexRegex6digit.test(customValues.fgcolor) &&
                !hexRegex3digit.test(customValues.fgcolor)
            ) {
                customValues.fgcolor = "var(--fg)";
            } else {
                customValues.fgcolor = `#${customValues.fgcolor}`;
            }
        }

        setBodyBg(customValues.bgcolor);

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
        --cust-bg: {customValues.bgcolor};
        --cust-fg: {customValues.fgcolor};
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
            }}>◀</a
        >
        <a
            href="https://ring.pre1ude.dev"
            target="_top"
            data-watermark={testMode}
        >
            <Logo
                --width="100px"
                --hover-transform="scale(1.05)"
                --transform={logoLean}
                --color={customValues.fgcolor || "var(--fg)"}
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
    {/if}
</div>

<style>
    :global(body) {
        height: 100% !important;
        width: 100% !important;
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
        transition:
            color 0.3s ease,
            transform 0.3s var(--overshoot);

        &:hover {
            transform: translateX(var(--hover-X));
        }
    }
</style>
