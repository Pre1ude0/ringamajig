<script lang="ts">
    import { onMount, tick } from "svelte";
    import { fly } from "svelte/transition";

    type Notification = {
        id: number;
        title: string;
        message: string;
        type: string;
        duration?: number; // ms
    };

    let notifications: Notification[] = [];

    onMount(async () => {
        const res = await fetch("/api/notifications");
        if (!res.ok) return;
        notifications = await res.json();

        notifications
            .filter((n) => n.duration)
            .forEach((n) => {
                setTimeout(() => {
                    notifications = notifications.filter((x) => x.id !== n.id);
                }, n.duration);
            });

        // Wait for DOM so bars exist before triggering animation
        await tick();

        requestAnimationFrame(() => {
            const bars =
                document.querySelectorAll<HTMLElement>(".duration-bar");
            bars.forEach((bar) => {
                bar.dataset.started = "true";
            });
        });
    });

    function trackById(n: Notification) {
        return n.id;
    }
</script>

<div class="sticky-box-parent">
    <div class="sticky-box-child">
        {#each notifications as n, i}
            <div
                class={`notification ${n.type}`}
                id={`notification-${n.id}`}
                in:fly={{ duration: 300, delay: 100 * i, y: 20 }}
                out:fly={{ duration: 300, y: -20 }}
            >
                <button
                    aria-label="Close notification"
                    class="close"
                    onclick={() => {
                        notifications = notifications.filter(
                            (x) => x.id !== n.id,
                        );
                    }}
                >
                    <i class="nf nf-fa-times"></i>
                </button>
                <div class="top">
                    {#if n.type === "warning"}
                        <i class="nf nf-fa-exclamation_triangle"></i>
                    {:else if n.type === "info"}
                        <i class="nf nf-fa-info_circle"></i>
                    {:else if n.type === "success"}
                        <i class="nf nf-fa-check_circle"></i>
                    {:else}
                        <i class="nf nf-fa-bell"></i>
                    {/if}
                    <h3>{n.title}</h3>
                </div>
                {#if n.message && n.message !== ""}
                    <div class="bottom">
                        <p>{n.message}</p>
                    </div>
                {/if}
                {#if n.duration}
                    <div
                        class="duration-bar"
                        style={`--duration: ${n.duration}ms;`}
                    ></div>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .sticky-box-parent {
        display: flex;
        position: absolute;
        top: 50px;
        bottom: 0;
        right: 10px;
        height: calc(100% - 50px);
        flex-direction: column;
    }

    .sticky-box-child {
        position: sticky;
        top: 10px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 10px;
        z-index: 100;
    }

    .notification {
        position: relative;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        color: var(--fg);
        width: 320px;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        height: fit-content;
        gap: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        background-color: var(--bg-secondary);
        border: 1px solid var(--fg);
        color: var(--fg);

        transition:
            background-color 0.3s,
            color 0.3s,
            border-color 0.3s;

        &.success {
            background-color: var(--success-bg);
            color: var(--success);
            border: 1px solid var(--success);

            .duration-bar {
                background-color: var(--success);
            }
        }
        &.warning {
            background-color: var(--error-bg);
            color: var(--error);
            border: 1px solid var(--error);

            .duration-bar {
                background-color: var(--error);
            }
        }
        &.info {
            background-color: var(--info-bg);
            color: var(--info);
            border: 1px solid var(--info);
            .duration-bar {
                background-color: var(--info);
            }
        }

        .top {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            line-height: 1.2;
            height: fit-content;
            padding: 5px 0;

            i {
                font-size: 200%;
                height: 100%;
                margin-right: 5px;
                aspect-ratio: 1;
                display: flex;
                max-width: 30%;
                align-items: center;
                justify-content: center;
            }

            h3 {
                margin: 0;
                font-size: 1.5em;
                font-weight: bold;
                height: 100%;
                word-wrap: break-word;
                overflow: initial;

                &:before {
                    content: none;
                }
            }
        }

        .bottom {
            flex: 1;
            font-size: 1.2em;
            line-height: 1.5;

            p {
                margin: 0;
                font-size: 1em;
                text-indent: 0;
            }
        }

        .duration-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 5px;
            width: 100%;

            :global(&[data-started="true"]) {
                width: 0;
            }

            transition: width var(--duration, 0) linear;
        }

        .close {
            position: absolute;
            top: 0;
            right: 0;
            transform: translate(50%, -50%);
            background: none;
            border: inherit;
            border-radius: 50%;
            padding: 7px;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 10px;

            color: inherit;
            background-color: inherit;
        }
    }
</style>
