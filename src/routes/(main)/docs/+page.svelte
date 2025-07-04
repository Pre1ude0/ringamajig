<script lang="ts">
    import { onMount } from "svelte";
    import { addCopyButtons } from "$lib/codeBlock";

    onMount(() => {
        if (window.PR) {
            window.PR.prettyPrint();
        }
        addCopyButtons();
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/prettify.css" />
    <script
        src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"
    ></script>
    <link rel="stylesheet" href="/gaydients.css" />
</svelte:head>

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
        <h2 id="how-to-join">
            "How do I join?" <span style="font-size: 0.5em;"
                >- You, supposedly</span
            >
        </h2>
        <p>
            Fret not my fellow indie dev enthusiast! I have written this guide
            to my best ability to explain how <strong>you</strong> can become part
            of this niche internet community
        </p>
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
        <!-- <note data-type="critical">
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
        </note> -->
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
        <table data-type="meta-tags">
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
                <tr class="optional">
                    <td><code>pride-flag</code></td>
                    <td>name</td>
                    <td>
                        The pride flag that'll appear on the index number of
                        your tile. For a list of available flags, see the <a
                            href="#pride-flags">full list</a
                        >
                    </td>
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
        <p>These are the meta tags of the ring-amajig webring</p>
        <pre class="prettyprint lang-html">
            &lt!-- Required tags --&gt
            &ltmeta property="og:title" content="Ring-amajig" /&gt
            &ltmeta property="og:description" content="Yet another webring on the www" /&gt
            &ltmeta property="og:image" content="https://ring.pre1ude.dev/favicon.png" /&gt
            &ltmeta property="og:url" content="https://ring.pre1ude.dev" /&gt

            &lt!-- Optional tags --&gt
            &ltmeta property="og:site_name" content="ring.pre1ude.dev" /&gt
            &ltmeta name="theme-color" content="#ffffff" /&gt
            &ltmeta name="pride-flag" content="progress-pride" /&gt
        </pre>
    </div>
    <div class="container">
        <h2>Webring iframe</h2>
        <p>
            To embed the actual webring widget on your site, you need to use an
            iframe pointing to the <code>/ring</code> route of the ringamajig
            page with the url of your site in the <code>url</code>
            <a href="https://en.wikipedia.org/wiki/Query_string"
                >query parameter</a
            >
            like so:
        </p>
        <pre class="prettyprint lang-html">
            &ltiframe
                src="https://ring.pre1ude.dev/ring?url=https://your-site.com"
                width="230px"
                height="100px"
                frameborder="0"
                scrolling="no"
            &gt&lt/iframe&gt
        </pre>
        <p>
            There are also some optional parameters you can use to customize the
            look of the contents of the iframe on your page via querying them
            together like so:
        </p>
        <pre>
            https://ring.pre1ude.dev/ring?url=https://your-site.com&fgcolor=ffffff&bgcolor=000000
        </pre>
        <note data-type="info">
            <div class="title">
                <i class="nf nf-fa-circle_info"></i> note
            </div>
            <div class="content">
                <p>
                    iframe not showing up even though you've set <code>url</code
                    >
                    like shown?
                    <a href="/1.png" target="_blank"
                        >Thats intended, not a bug</a
                    > - if you're not verified/approved yet, the iframe won't show
                    any content, eliminating that awkward phase of having a widget
                    on your site that doesn't work!
                </p>
                <p>
                    Still want to customize your widget? No problem! Just add <code
                        >test=true</code
                    > to your query and configure your iframe that way for the time
                    being! Just remember to remove it when pushing your site live
                </p>
            </div>
        </note>
        <h3>Query parameters handled by the ring-amajig iframe:</h3>
        <table data-type="query-parameters">
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Description</th>
                    <th>Default</th>
                </tr>
            </thead>
            <tbody>
                <tr class="required">
                    <td><code>url</code></td>
                    <td
                        >The <a
                            href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL#absolute_urls_vs._relative_urls"
                            target="_blank">absolute URL</a
                        >
                        of your site, which should match the
                        <code>og:url</code> meta tag</td
                    >
                    <td><i>None</i></td>
                </tr>
                <tr class="optional">
                    <td><code>test</code></td>
                    <td
                        >If set to <code>true</code>, the iframe will display a
                        test format of the webring that doesn't check for
                        validity of the <code>url</code> value (mainly for people
                        are yet to be verified and want to experiment with how the
                        widget would look on their site)
                    </td>
                    <td><code>false</code></td>
                </tr><tr class="optional">
                    <td><code>fgcolor</code></td>
                    <td
                        >The foreground color of the webring widget, in <a
                            href="https://en.wikipedia.org/wiki/Web_colors#Shorthand_hexadecimal_form"
                            target="_blank">hex</a
                        >
                        or html color (e.g. <code>red</code>) format</td
                    >
                    <td
                        ><span style="--color: var(--fg)" class="color"
                        ></span></td
                    >
                </tr>
                <tr class="optional">
                    <td><code>bgcolor</code></td>
                    <td
                        >The background color of the webring widget, in <a
                            href="https://en.wikipedia.org/wiki/Web_colors#Shorthand_hexadecimal_form"
                            target="_blank">hex</a
                        >
                        or html color (e.g. <code>red</code>) format</td
                    >
                    <td
                        ><span class="color" style="--color: var(--bg)"
                        ></span></td
                    >
                </tr>
                <tr class="optional">
                    <td><code>animdur</code></td>
                    <td>
                        The duration of the appearing animation of the iframe
                        widget in ms
                    </td>
                    <td><i>500</i></td>
                </tr>
            </tbody>
        </table>
        <note data-type="warning">
            <div class="title">
                <i class="nf nf-fa-circle_exclamation"></i> defining hex colors
            </div>
            <div class="content">
                <p>
                    The hex color codes should be passed without the <code
                        >#</code
                    >
                    character as it will start a
                    <a
                        href="https://developer.mozilla.org/en-US/docs/Web/API/URL/hash"
                        target="_blank">hash</a
                    >
                    in the query string (e.g.
                    <code>ff0000</code>
                    for red, not <code>#ff0000</code>)
                </p>
            </div>
        </note>
    </div>
    <div class="container">
        <h2>What next?</h2>
        <p>
            Added all of the required meta tags and the iframe? Great! Your work
            here is done!
        </p>
        <p>
            Now you just have to wait for me to approve your site and you'll be
            able to see it on the <a
                href="https://ring.pre1ude.dev"
                target="_blank">main page</a
            >!
        </p>
    </div>
    <div class="container">
        <h2 id="pride-flags">List of available pride flag gradients</h2>
        <div class="pride-flag-tables">
            <table data-type="pride-flags">
                <thead>
                    <tr>
                        <th>Flag name</th>
                        <th>Gradient</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>pride</code></td>
                        <td
                            ><span
                                class="color"
                                style="--linear-background: var(--pride)"
                            ></span></td
                        >
                    </tr>
                    <tr>
                        <td><code>progress-pride</code></td>
                        <td
                            ><span
                                class="color"
                                style="--linear-background: var(--progress-pride)"
                            ></span></td
                        >
                    </tr>
                    <tr>
                        <td><code>transgender</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--transgender)"
                            >
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>nonbinary</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--nonbinary)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>agender</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--agender)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>genderqueer</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--genderqueer)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>demigirl</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--demigirl)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>demiboy</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--demiboy)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>genderfluid</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--genderfluid)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>bigender</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--bigender)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>intersex</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--intersex)"
                            ></span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table data-type="pride-flags">
                <thead>
                    <tr>
                        <th>Flag name</th>
                        <th>Gradient</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><code>bisexual</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--bisexual)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>pansexual</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--pansexual)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>lesbian</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--lesbian)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>gay</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--gay)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>asexual</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--asexual)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>aromantic</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--aromantic)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>aroace</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--aroace)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>abrosexual</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--abrosexual)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>omnisexual</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--omnisexual)"
                            ></span>
                        </td>
                    </tr>
                    <tr>
                        <td><code>polysexual</code></td>
                        <td>
                            <span
                                class="color"
                                style="--linear-background: var(--polysexual)"
                            ></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
    .view {
        padding-top: 100px;
        padding-bottom: 100px;
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

    p {
        font-size: 1.2em;
    }

    note {
        border-radius: var(--border-radius-secondary);
        overflow: hidden;
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
        }

        &[data-type="info"] {
            .title {
                background-color: var(--info);
            }

            position: relative;
            border: 1px var(--info) solid;
        }

        /* &[data-type="critical"] {
            .title {
                background-color: var(--error);
            }

            position: relative;
            border: 1px var(--error) solid;

            border-radius: var(--border-radius);
        } */

        transition: border-color 0.3s ease-in-out;
    }

    p {
        margin-bottom: 1em;
        text-indent: 1.5em;
    }

    .pride-flag-tables {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: 1em;
        justify-content: center;
        align-items: flex-start;
    }

    table {
        border-radius: var(--border-radius);
        margin-bottom: 1em;
        width: 96%;
        border-collapse: collapse;
        border: 1px solid transparent;
        margin-left: 2%;

        text-align: left;

        code {
            position: relative;
        }

        .required td:first-of-type code:before {
            position: absolute;
            top: -5px;
            right: -10px;
            color: var(--required);
            content: "*";
        }

        td,
        th {
            position: relative;
            padding: 0.5em;
            border-bottom: 1px solid var(--fg);
            border-right: 1px solid var(--fg);

            span.color {
                display: block;
                width: 4em;
                height: 1.5em;
                background: var(--linear-background, var(--color));
                border: 1px var(--fg) solid;
                border-radius: var(--border-radius-secondary);
            }
        }

        &[data-type="pride-flags"] {
            width: 40%;
            td {
                height: 2em;
            }
            td:nth-child(2) {
                width: 6em;
            }
            span.color {
                position: absolute;
                top: 0;
                left: 0;
                transform: rotate(90deg) translateX(-70%) translateY(-40%);
                width: 2em;
                height: 6em;
            }
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

    table[data-type="query-parameters"] {
        td:last-child,
        th:last-child {
            text-align: right;
        }
    }

    @media screen and (max-width: 600px) {
        .container {
            box-sizing: border-box;
            width: 100%;
            padding: 1em;
        }
        h1 {
            font-size: 2.5em;
        }

        h2 {
            margin-top: 1em;
            font-size: 1.8em;
        }

        h3 {
            font-size: 1.5em;
        }

        p {
            font-size: 1em;
        }

        table {
            width: 100%;
            margin-left: 0;
        }

        note {
            margin: 0.5em 0;
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
</style>
