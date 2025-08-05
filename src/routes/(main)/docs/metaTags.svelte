<div class="container">
    <h2 id="how-to-join">
        "How do I join?" <span style="font-size: 0.5em;">- You, supposedly</span
        >
    </h2>
    <p>
        Fret not my fellow indie dev enthusiast! I have written this guide to my
        best ability to explain how <strong>you</strong> can become part of this
        niche internet community
    </p>
    <note data-type="warning">
        <div class="title">
            <i class="nf nf-fa-circle_exclamation"></i> read first
        </div>
        <div class="content">
            <p>
                Please <strong>please</strong> first let me know that you'd like
                to join the webring by sending me an email on
                <a href="mailto:laura@pre1ude.dev">laura@pre1ude.dev</a>
                or dming me on discord (this will probably work better if I've already
                talked with you previously) -
                <a
                    href="https://discord.com/users/737983831000350731"
                    target="_blank">@pre1ude0</a
                >!
            </p>
            <p>
                This webring has <strong>manual approval</strong> to keep the webring
                clean and sfw for everyone
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
        >, which will be used to generate your site card on the list of pages
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
                    >A short description/fragment of the contents from your site</td
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
                    >The name of your site (usually the same as the URL without
                    the <a
                        href="https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol"
                        target="_blank">protocol</a
                    >)</td
                >
            </tr>
            <tr>
                <td><code>page-button</code></td>
                <td>name</td>
                <td
                    >An <a
                        href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL#absolute_urls_vs._relative_urls"
                        target="_blank">absolute URL</a
                    >
                    to your sites
                    <a href="https://indieweb.org/88x31" target="_blank"
                        >88x31 button</a
                    > image</td
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
                    The pride flag that'll appear on the index number of your
                    tile. For a list of available flags, see the <a
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
                >, which is a standard used by many social media platforms like
                bluesky and discord to display rich content about sites!
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
    <note data-type="info">
        <div class="title">
            <i class="nf nf-fa-circle_info"></i> favicon / under the hood
        </div>
        <div class="content">
            <p>
                The <a
                    href="https://developer.mozilla.org/en-US/docs/Glossary/Favicon"
                    target="_blank">favicon</a
                > of your site will also show up beside the link on your webring
                site tile
            </p>
            <p>
                You can define this <a
                    href="https://developer.mozilla.org/en-US/docs/Glossary/Favicon"
                    target="_blank">favicon</a
                >
                of your site by adding a link tag to the head of your site
            </p>
            <pre class="prettyprint lang-html">
&ltlink rel="icon" href="path/to/your/favicon.png" /&gt
</pre>
            <p>
                or by putting a <code>favicon.ico</code> file in the root of your
                static site as so
            </p>
            <pre class="prettyprint">
Site/
├── index.html
├── styles.css
├── script.js
└── <span class="highlight">favicon.ico</span>
</pre>
            <p>
                or if you're hosting the site dynamically with a web framework
                like <code>node.js</code>, <code>react</code> or
                <code>flask</code>
            </p>
            <pre class="prettyprint">
App/
├── main.py <span class="slash">/</span> main.js
├── templates <span class="slash">/</span> views
│   └─ index.html
└── static <span class="slash">/</span> public
    └─ <span class="highlight">favicon.ico</span>
</pre>
        </div>
    </note>
</div>

<style>
    .highlight :global(span.pln) {
        color: light-dark(#006400, #32cd32) !important;
        font-weight: bold;
    }

    .slash :global(span.pun) {
        color: light-dark(#808080, #a9a9a9) !important;
    }

    note {
        pre {
            white-space: pre-wrap;
            overflow-x: auto;
            margin: 0.5em;

            :global(span.typ),
            :global(span.kwd) {
                color: inherit;
                font-weight: inherit;
            }
        }
    }
</style>
