<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    let notifications: Array<any> = $state([]);

    onMount(async () => {
        const res = await fetch("/api/notifications");
        if (res.ok) {
            notifications = await res.json();
        }
    });
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
                    onclick={() => notifications.splice(i, 1)}
                >
                    <i class="nf nf-fa-times"></i>
                </button>
                <div class="left">
                    {#if n.type === "warning"}
                        <i class="nf nf-fa-exclamation_triangle"></i>
                    {:else if n.type === "info"}
                        <i class="nf nf-fa-info_circle"></i>
                    {:else if n.type === "success"}
                        <i class="nf nf-fa-check_circle"></i>
                    {:else}
                        <i class="nf nf-fa-bell"></i>
                    {/if}
                </div>
                <div class="right">
                    <h3>{n.title}</h3>
                    <p>{n.message}</p>
                </div>
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
        height: 100%;
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
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
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
        }
        &.warning {
            background-color: var(--error-bg);
            color: var(--error);
            border: 1px solid var(--error);
        }
        &.info {
            background-color: var(--info-bg);
            color: var(--info);
            border: 1px solid var(--info);
        }

        .left {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5em;
            width: 40px;
            height: 100%;
        }

        .right {
            flex: 1;
            font-size: 1.2em;
            line-height: 1.5;

            h3 {
                margin: 2px 0;
                font-size: 1.2em;
                font-weight: bold;

                &:before {
                    content: none;
                }
            }

            p {
                margin: 0;
                font-size: 1em;
                text-indent: 0;
            }
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
