<script lang="ts">
    import { onMount } from "svelte";
    import { addCopyButtons } from "$lib/codeBlock";

    onMount(() => {
        if (window.PR) {
            window.PR.prettyPrint();
            addCopyButtons();
        }
    });
</script>

<div class="view">
    <div class="container">
        <h1>Ring-amajig documentation</h1>
        <note data-type="info">
            <div class="title">
                <i class="nf nf-fa-circle_info"></i> note
            </div>
            <div class="content">
                <p>
                    This page is currently <strong>very</strong> WIP - suggestions
                    and general feedback are very appreaciated!
                </p>
            </div>
        </note>
    </div>
    <div class="container">
        <h2 id="how-to-join">How to join</h2>
        <note data-type="warning">
            <div class="title">
                <i class="nf nf-fa-circle_exclamation"></i> read first
            </div>
            <div class="content">
                <p>
                    Please <strong>please</strong> first let me know that you'd
                    like to join the webring by sending me an email on
                    <a href="mailto:laura@pre1ude.dev">laura@pre1ude.dev</a>
                    or dming me on discord (this will probably work better if I've
                    already talked with you previously) -
                    <a
                        href="https://discord.com/users/737983831000350731"
                        target="_blank">@pre1ude0</a
                    >!
                </p>
                <p>
                    This webring has <strong>manual approval</strong> to keep the
                    webring clean and sfw for everyone
                </p>
            </div>
        </note>
        <note data-type="critical">
            <div class="title">
                <i class="nf nf-fa-warning"></i> NOTICE
            </div>
            <div class="content">
                <p>
                    Related to the previous note above this one (which if you
                    haven't read - shame on you), the webring is <strong
                        >currently NOT</strong
                    > accepting entries as it's still very much in a beta/unfinished
                    state!
                </p>
            </div>
        </note>
        <h2>Meta tags</h2>
        <p>
            Ring-amajig requires your site to have a set of
            <a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta"
                target="_blank">meta tags</a
            >, which will be used to generate your site card on the list of
            pages
        </p>
        <h3>Meta tags handled by the ringamajig api:</h3>
        <table class="meta-tags">
            <thead>
                <tr>
                    <th>Meta Tag</th>
                    <th>Type</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="required">
                    <td><code>og:title</code></td>
                    <td>property</td>
                    <td>The title of your site</td>
                </tr>
                <tr class="required">
                    <td><code>og:description</code></td>
                    <td>property</td>
                    <td
                        >A short description/fragment of the contents from your
                        site</td
                    >
                </tr>
                <tr class="required">
                    <td><code>og:image</code></td>
                    <td>property</td>
                    <td
                        >An <a
                            href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL#absolute_urls_vs._relative_urls"
                            target="_blank">absolute URL</a
                        > to a thumbnail image</td
                    >
                </tr>
                <tr class="required">
                    <td><code>og:url</code></td>
                    <td>property</td>
                    <td>The absolute URL of your site</td>
                </tr>
                <tr>
                    <td><code>og:site_name</code></td>
                    <td>property</td>
                    <td
                        >The name of your site (usually the same as the URL
                        without the <a
                            href="https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol"
                            target="_blank">protocol</a
                        >)</td
                    >
                </tr>
                <tr>
                    <td
                        ><code
                            ><a
                                href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color"
                                target="_blank">theme-color</a
                            ></code
                        ></td
                    >
                    <td>name</td>
                    <td
                        >The theme color of your site in <a
                            href="https://en.wikipedia.org/wiki/Web_colors#Shorthand_hexadecimal_form"
                            target="_blank">hex</a
                        >, which can also be seen on
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color#browser_compatibility"
                            target="_blank">some browsers</a
                        ></td
                    >
                </tr>
            </tbody>
        </table>
        <note data-type="info">
            <div class="title">
                <i class="nf nf-fa-circle_info"></i> note
            </div>
            <div class="content">
                <p>
                    The <code>og</code> prefix in the meta tags stands for
                    <a href="https://ogp.me/" target="_blank"
                        >the Open Graph protocol</a
                    >, which is a standard used by many social media platforms
                    like bluesky and discord to display rich content about
                    sites!
                </p>
            </div>
        </note>
        <h3>Example:</h3>
        <p>Heres the meta tags of the ring-amajig webring</p>
        <pre class="prettyprint lang-html">
            &lt!-- Required tags --&gt
            &ltmeta property="og:title" content="Ring-amajig" /&gt
            &ltmeta property="og:description" content="Yet another webring on the www" /&gt
            &ltmeta property="og:image" content="https://ring.pre1ude.dev/favicon.png" /&gt
            &ltmeta property="og:url" content="https://ring.pre1ude.dev" /&gt

            &lt!-- Optional tags --&gt
            &ltmeta property="og:site_name" content="ring.pre1ude.dev" /&gt
            &ltmeta name="theme-color" content="#ffffff" /&gt
        </pre>
    </div>
    <div class="container">
        <h2>Webring iframe</h2>
        <p>
            To embed the actual webring widget on your site, you need to use an
            iframe pointing to the <code>/ring</code> endpoint:
        </p>
        <pre class="prettyprint lang-html">
            &ltiframe
                src="https://ring.pre1ude.dev/ring"
                width="300px"
                height="100px"
                frameborder="0"
                scrolling="no"
            &gt&lt/iframe&gt
        </pre>
    </div>
</div>

<style>
    .view {
        padding-top: 100px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
    }

    .container {
        width: 100%;
        max-width: 1000px;
    }

    h1 {
        font-size: 4em;
        margin-bottom: 0.5em;
    }

    h2 {
        font-size: 3em;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
    }

    h3 {
        margin-top: 1.5em;
        margin-left: 1em;
        margin-bottom: 0.5em;
    }

    note {
        display: block;
        margin: 0 1em 2em 1em;

        .title {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5em;
            padding: 0.5em 1em;
            color: var(--fg);
            font-weight: bold;
            text-transform: uppercase;

            transition:
                background-color 0.3s ease-in-out,
                color 0.3s ease-in-out;
        }

        .content {
            padding: 1em;
            color: var(--fg);
            display: flex;
            flex-direction: column;
            gap: 0.5em;

            p {
                margin: 0;
                text-indent: 0;
            }

            transition: color 0.3s ease-in-out;
        }

        &[data-type="warning"] {
            .title {
                background-color: var(--warning);
            }

            position: relative;
            border: 1px var(--warning) solid;

            border-radius: var(--border-radius);
        }

        &[data-type="info"] {
            .title {
                background-color: var(--info);
            }

            position: relative;
            border: 1px var(--info) solid;

            border-radius: var(--border-radius);
        }

        &[data-type="critical"] {
            .title {
                background-color: var(--error);
            }

            position: relative;
            border: 1px var(--error) solid;

            border-radius: var(--border-radius);
        }

        transition: border-color 0.3s ease-in-out;
    }

    p {
        margin-bottom: 1em;
        text-indent: 1.5em;
    }

    table.meta-tags {
        border-radius: var(--border-radius);
        margin-bottom: 1em;
        width: 90%;
        border-collapse: collapse;
        border: 1px solid transparent;
        margin-left: 2%;

        text-align: left;

        code {
            position: relative;
        }

        .required code:after {
            position: absolute;
            top: -5px;
            right: -10px;
            color: var(--required);
            content: "*";
        }

        td,
        th {
            padding: 0.5em;
            border-bottom: 1px solid var(--fg);
            border-right: 1px solid var(--fg);
        }

        td:last-child,
        th:last-child {
            border-right: none;
        }

        tr:last-child td {
            border-bottom: none;
        }

        th {
            font-weight: bold;
        }
    }

    /* li {
        margin-bottom: 0.5em;
        padding-left: 0.5em;

        position: relative;
        list-style-type: none;



        &.optional:before {
            color: var(--fg);
            content: "-";
        }

        &::before {
            position: absolute;

            font-weight: bold;
            left: -6px;
        }
    } */

    pre {
        margin: 0 1em 2em 1em;
        padding: 1em;
        border-radius: var(--border-radius);
        overflow-x: auto;
    }
</style>
