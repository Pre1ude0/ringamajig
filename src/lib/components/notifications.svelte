<script lang="ts">
    import { onMount } from "svelte";
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
        if (res.ok) {
            notifications = await res.json();
        }
    });

    function dismiss(id: number) {
        notifications = notifications.filter((n) => n.id !== id);
    }
</script>

<div class="sticky-box-parent">
    <div class="sticky-box-child">
        {#each notifications as n, i (n.id)}
            <div
                class={`notification ${n.type}`}
                id={`notification-${n.id}`}
                in:fly={{ duration: 300, delay: 100 * i, y: 20 }}
                out:fly={{ duration: 300, y: -20 }}
            >
                <button
                    aria-label="Close notification"
                    class="close"
                    on:click={() => dismiss(n.id)}
                >
                    <i class="nf nf-fa-times"></i>
                </button>

                <div class="top">
                    {#if n.type === "warning"}
                        <i
                            class="nf nf-fa-exclamation_triangle"
                            aria-hidden="true"
                        ></i>
                    {:else if n.type === "info"}
                        <i class="nf nf-fa-info_circle" aria-hidden="true"></i>
                    {:else if n.type === "success"}
                        <i class="nf nf-fa-check_circle" aria-hidden="true"></i>
                    {:else}
                        <i class="nf nf-fa-bell" aria-hidden="true"></i>
                    {/if}
                    <h3>{n.title}</h3>
                </div>

                {#if n.message}
                    <div class="bottom">
                        <p>{n.message}</p>
                    </div>
                {/if}

                {#if n.duration}
                    <div
                        class="duration-bar"
                        style={`--duration:${n.duration}ms`}
                        on:animationend={() => dismiss(n.id)}
                        aria-hidden="true"
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
        width: 320px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        background-color: var(--bg-secondary);
        border: 1px solid var(--fg);
        color: var(--fg);
        transition:
            background-color 0.3s,
            color 0.3s,
            border-color 0.3s;
    }

    .notification.success {
        background-color: var(--success-bg);
        color: var(--success);
        border-color: var(--success);
    }

    .notification.warning {
        background-color: var(--error-bg);
        color: var(--error);
        border-color: var(--error);
    }

    .notification.info {
        background-color: var(--info-bg);
        color: var(--info);
        border-color: var(--info);
    }

    .top {
        display: flex;
        align-items: center;
        width: 100%;
        line-height: 1.2;
        padding: 5px 0;
    }

    .top i {
        font-size: 200%;
        margin-right: 5px;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .top h3 {
        margin: 0;
        font-size: 1.5em;
        font-weight: bold;
    }

    .bottom {
        flex: 1;
        font-size: 1.2em;
        line-height: 1.5;
    }

    .bottom p {
        margin: 0;
        font-size: 1em;
        text-indent: 0;
    }

    @keyframes shrink {
        from {
            width: 100%;
        }
        to {
            width: 0;
        }
    }

    .duration-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 5px;
        width: 0%;
        background-color: currentColor;
        animation: shrink var(--duration, 4000ms) linear forwards;
    }

    .notification:hover .duration-bar {
        animation-play-state: paused;
    }

    .close {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(40%, -40%);
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
</style>
