<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import Logo from "$lib/Logo.svelte";

    let hexRegex = /^[0-9A-F]{6}$/i;

    let previous: string = $state("");
    let next: string = $state("");

    let currentPageUrl: string = $state("");
    let pageDisplay: string = $state("none");
    let customValues: any = $state({});
    $inspect(customValues);

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
        // if (window.self === window.top) {
        //     goto("/");
        // }

        function isColor(strColor: string) {
            var s = new Option().style;
            s.color = strColor;
            return s.color == strColor;
        }

        currentPageUrl =
            new URL(window.location.href).searchParams.get("url") || "";

        customValues = {
            bgcolor: new URL(window.location.href).searchParams.get("bgcolor"),
            fgcolor: new URL(window.location.href).searchParams.get("fgcolor"),
        };

        if (!isColor(customValues.bgcolor)) {
            if (!hexRegex.test(customValues.bgcolor)) {
                customValues.bgcolor = "var(--bg)";
            } else {
                customValues.bgcolor = `#${customValues.bgcolor}`;
            }
        }

        if (!isColor(customValues.fgcolor)) {
            if (!hexRegex.test(customValues.fgcolor)) {
                customValues.fgcolor = "var(--fg)";
            } else {
                customValues.fgcolor = `#${customValues.fgcolor}`;
            }
        }

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

<div
    style="
        --display:{pageDisplay};
        --cust-bg: {customValues.bgcolor};
        --cust-fg: {customValues.fgcolor};
        "
>
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
</div>

<style>
    :global(body) {
        background-color: var(--cust-bg, var(--bg));
        height: 100%;
        width: 100%;
    }

    div {
        display: var(--display);
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;

        background-color: var(--cust-bg, var(--bg));
    }

    a {
        &:after {
            content: none;
        }

        border: none;
        font-size: 40pt;
        font-weight: bold;
        cursor: pointer;

        color: var(--cust-fg, var(--fg));

        height: 50px;
        line-height: 55px;
        transition:
            color 0.3s ease,
            transform 0.3s var(--overshoot);

        &:hover {
            transform: translateX(var(--hover-X));
        }
    }
</style>
