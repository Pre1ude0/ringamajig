<script lang="ts">
    import { onMount } from "svelte";
    import { elasticOut } from "svelte/easing";
    import { blur } from "svelte/transition";

    // Spin transition function
    function spin(
        node: HTMLElement,
        params: {
            duration?: number;
            degrees?: number;
            easing?: (t: number) => number;
        },
    ) {
        const existingTransform = getComputedStyle(node).transform.replace(
            "none",
            "",
        );

        return {
            delay: 0,
            duration: params.duration || 400,
            easing: params.easing || elasticOut,
            css: (t: any, u: any) =>
                `transform: ${existingTransform} rotate(${t * (params.degrees || 360)}deg)`,
        };
    }

    let darkMode: boolean = false;
    let rotation: string = "0deg";

    function toggleDarkMode() {
        darkMode = !darkMode;
        document.body.style.colorScheme = darkMode ? "dark" : "light";
        rotation = darkMode ? "360deg" : "0deg";
        document.cookie = `darkMode=${darkMode}; path=/; max-age=31536000`; // 1 year
    }

    function getCookie(cname: string) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    onMount(() => {
        const savedDarkMode =
            getCookie("darkMode") ||
            window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (savedDarkMode === "true") {
            darkMode = true;
            rotation = "360deg";
            document.body.style.colorScheme = "dark";
        } else {
            darkMode = false;
            rotation = "0deg";
            document.body.style.colorScheme = "light";
        }
    });
</script>

<button
    onclick={toggleDarkMode}
    class="dark-toggle"
    style="--rotation:{rotation}"
>
    {#if darkMode}
        <span in:blur={{ duration: 500 }}> dark </span>
    {:else}
        <span in:blur={{ duration: 500 }}> light </span>
    {/if}
    {#if darkMode}
        <i
            class="nf nf-oct-moon"
            in:spin={{ duration: 1000, degrees: -360 }}
            style="transform: scaleX(-1)"
        ></i>
    {:else}
        <i class="nf nf-oct-sun" in:spin={{ duration: 1000, degrees: 360 }}></i>
    {/if}
</button>

<style>
    button {
        display: flex;
        justify-content: space-around;
        align-items: center;

        background: none;
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 15px;
        height: 30px;
        gap: 10px;
        color: var(--fg);
        border: none;
        transition: color 0.3s ease-out;

        &:hover {
            span {
                transition:
                    opacity 0.15s ease-in-out,
                    transform 0.3s var(--overshoot);
                transform: translateX(0);
                opacity: 1 !important;
            }
        }

        i {
            font-size: 25px;
        }

        span {
            font-size: 20px;
            opacity: 0 !important;
            transform: translateX(100%);

            transition:
                transform 0.2s ease,
                opacity 0.15s ease-in-out;
        }
    }
</style>
