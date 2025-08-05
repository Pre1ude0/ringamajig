<script lang="ts">
    import { getOpenGraphData, trunicate } from "$lib/utils/pages";
    import { onMount } from "svelte";
    import { fly, blur } from "svelte/transition";
    import { goto } from "$app/navigation";

    let { index, pageName } = $props();
    let page: any = $state({});
    $inspect(page);

    onMount(async () => {
        page = await getOpenGraphData(pageName);
        if (page.error) {
            console.warn(`No Open Graph data found for page: ${index}`);
            page = {};
        }
    });
</script>

<div
    class="tile {!page || !page.og ? 'loading' : ''} "
    in:fly={{ y: 20, duration: 300, delay: index * 100 }}
    style="--index: '{index}'; --pride-flag: var(--{page.prideFlag});"
>
    {#if !page || !page.og}
        <div class="left">
            <div class="top">
                <div class="page-title"></div>
            </div>
            <div class="url"></div>
            <div class="description"></div>
        </div>
        <div class="right">
            <div class="img"></div>
        </div>
    {:else if page && page.og}
        <div
            class="theme-color"
            style="background-color: {page.themeColor ||
                'transparent'}; box-shadow: 0 0 7px {page.themeColor ||
                'transparent'};"
        ></div>
        <div class="left" in:blur={{ duration: 500 }}>
            <div class="top">
                <a
                    href={page.og["og:url"]}
                    target="_blank"
                    class="page-title"
                    draggable="false"
                    title={trunicate(page.og["og:title"], 50)}
                >
                    {page.og["og:title"]}
                </a>
            </div>
            <div class="url">
                {#if page.favicon}
                    <img src={page.favicon} alt="Site favicon" />
                {/if}
                <a href={page.og["og:url"]} target="_blank">
                    {page.og["og:site_name"]}
                </a>
            </div>
            {#if page.og["og:description"]}
                <p
                    class="description"
                    title={trunicate(page.og["og:description"], 200)}
                >
                    {page.og["og:description"]}
                </p>
            {/if}
        </div>
        <div class="right" in:blur={{ duration: 300 }}>
            <img
                src={page.og["og:image"]}
                alt="Site thumbnail"
                class="thumbnail"
            />
            {#if page.siteButton}
                <a href={page.og["og:url"]} target="_blank">
                    <img
                        src={page.siteButton}
                        class="blankie"
                        alt="Site 88x31 button"
                    />
                </a>
            {/if}
        </div>
    {/if}
</div>

<style>
    .tile {
        .theme-color {
            position: absolute;
            height: 100%;
            width: 5px;
            top: 0;
            left: 0;

            z-index: -1;
            border-top-left-radius: var(--border-radius);
            border-bottom-left-radius: var(--border-radius);
        }

        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 20px;
        width: 500px;
        height: 150px;
        padding: 20px;
        border: 1px solid var(--fg);
        border-radius: var(--border-radius);

        transition:
            color 0.3s ease-in-out,
            border 0.3s ease-in-out,
            box-shadow 0.3s ease-in-out;

        &:before {
            content: var(--index);
            position: absolute;
            top: 10%;
            left: 0;
            bottom: 10%;
            right: 0;
            font-size: 10em;
            /* color: var(--fg); */
            filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            z-index: 0;
            transition: color 0.3s ease-in-out;

            background: var(--pride-flag, light-dark(#00000040, #ffffff40));
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            transition: background 0.3s ease-in-out;
        }

        .left {
            .top {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 10px;
            }

            width: calc(70% - 20px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            z-index: 1;

            .page-title {
                font-size: 1.5em;
                color: var(--fg);
                text-decoration: none;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-clamp: 1;
                overflow: hidden;

                transition: color 0.3s ease-in-out;

                /* &:before {
                        content: "";
                        background-image: linear-gradient(
                            to right,
                            transparent,
                            var(--bg) 80%
                        );
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        height: 100%;
                        width: 50px;
                    } */

                &:hover {
                    transform: none;
                }

                &:after {
                    content: none;
                }
            }

            .url {
                font-size: 0.9em;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 5px;

                img {
                    aspect-ratio: 1;
                    height: 20px;
                    vertical-align: middle;
                }
            }

            .description {
                margin: 0;
                margin-top: 10px;

                overflow: hidden;
                line-height: 1.5;
                text-overflow: ellipsis;

                display: -webkit-box;
                line-clamp: 2;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;

                transition: color 0.3s ease-in-out;
            }
        }

        .right {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2px;

            max-width: 30%;
            z-index: 1;

            &:hover {
                .blankie {
                    opacity: 0.2;
                }
            }

            .thumbnail {
                object-fit: cover;
                height: 100%;
                width: auto;
                max-width: 150px;
                max-height: 150px;
                border-radius: var(--border-radius);
            }

            a {
                position: absolute;
                bottom: -5px;
                right: -5px;
                display: flex;
                align-items: flex-end;
                justify-content: flex-end;

                &:after {
                    content: none;
                }

                .blankie {
                    aspect-ratio: 88 / 31;
                    border-radius: 0;
                    height: 31px;
                    width: 88px;
                    object-fit: cover;
                    box-shadow: 0 0 5px var(--bg);
                    transition: opacity 0.15s ease-in-out;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }

    /* li:hover {
            box-shadow: 0 0 10px var(--hover-shadow);
        } */

    @keyframes loading {
        0% {
            background-position: -20% 0%;
        }
        100% {
            background-position: 120% 0%;
        }
    }

    :global(.loading) {
        .page-title {
            height: 30px;
            width: 120px;
        }

        .url {
            height: 17px;
            width: 150px;
            margin-top: 5px;
        }

        .description {
            height: 80px;
            width: 250px;
        }

        .right {
            height: 100%;
            aspect-ratio: 1;
        }
        .img {
            height: 100%;
            width: 100%;
        }

        .page-title,
        .description,
        .url,
        .img {
            border-radius: var(--border-radius);
            background: linear-gradient(
                100deg,
                light-dark(rgba(0, 0, 0, 0.01), rgba(255, 255, 255, 0.01)) 0%,
                light-dark(rgba(0, 0, 0, 0.01), rgba(255, 255, 255, 0.01)) 45%,
                light-dark(rgba(0, 0, 0, 0.3), rgba(255, 255, 255, 0.3)) 50%,
                light-dark(rgba(0, 0, 0, 0.01), rgba(255, 255, 255, 0.01)) 55%,
                light-dark(rgba(0, 0, 0, 0.01), rgba(255, 255, 255, 0.01)) 100%
            );

            background-size: 200% 100%;

            animation: loading 1.5s ease-in-out infinite;
        }
    }

    @media screen and (max-width: 600px) {
        .tile:before {
            background-size: 100% 40%;
            background-position-y: 53%;
            top: 0;
            filter: blur(3px);
            bottom: 50%;
            right: 10%;
            font-size: 5em;
            justify-content: flex-end;
        }

        .tile {
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
            height: auto;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        .left {
            width: 100%;
            max-width: 100% !important;
        }

        .right {
            max-width: 100% !important;
            width: 100%;
            margin-top: 10px;

            .thumbnail {
                width: 100% !important;
                max-width: 100% !important;
                height: 200px !important;
                object-fit: cover;
            }

            .blankie {
                width: 100% !important;
                max-width: 100%;
                height: auto !important;
                aspect-ratio: auto;
            }
        }
    }
</style>
