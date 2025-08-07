<script lang="ts">
    import prideFlags from "$lib/data/prideFlags.json";

    const half = Math.ceil(Object.keys(prideFlags).length / 2);
    const prideFlags1 = Object.keys(prideFlags).slice(0, half);
    const prideFlags2 = Object.keys(prideFlags).slice(half);
</script>

<div class="container">
    <h2 id="pride-flags">List of available pride flag gradients</h2>
    <div class="pride-flag-tables">
        <table data-type="pride-flags">
            <thead><tr><th>Flag name</th><th>Gradient</th></tr></thead>
            <tbody>
                {#each prideFlags1 as flag}
                    <tr>
                        <td><code>{flag}</code></td>
                        <td
                            ><span
                                class="color"
                                style="--linear-background: var(--{flag})"
                            ></span></td
                        >
                    </tr>
                {/each}
            </tbody>
        </table>
        <table data-type="pride-flags">
            <thead><tr><th>Flag name</th><th>Gradient</th></tr></thead>
            <tbody>
                {#each prideFlags2 as flag}
                    <tr>
                        <td><code>{flag}</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--{flag})"
                            ></span>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
