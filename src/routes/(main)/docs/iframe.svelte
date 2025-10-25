<div class="container">
    <h2>Webring iframe</h2>
    <p>
        To embed the actual webring widget on your site, you need to use an
        iframe pointing to the <code>/ring</code> route of the ringamajig page
        with the url of your site in the <code>url</code>
        <a href="https://en.wikipedia.org/wiki/Query_string">query parameter</a>
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
                iframe not showing up even though you've set <code>url</code>
                like shown?
                <a href="/img/1.png" target="_blank"
                    >Thats intended, not a bug</a
                > - if you're not verified/approved yet, the iframe won't show any
                content, eliminating that awkward phase of having a widget on your
                site that doesn't work!
            </p>
            <p>
                Still want to customize your widget? No problem! Just add <code
                    >test=true</code
                > to your query and configure your iframe that way for the time being!
                Just remember to remove it when pushing your site live
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
                    >If set to <code>true</code>, the iframe will display a test
                    format of the webring that doesn't check for validity of the
                    <code>url</code> value (mainly for people are yet to be verified
                    and want to experiment with how the widget would look on their
                    site)
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
                <td><span style="--color: var(--fg)" class="color"></span></td>
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
                <td><span class="color" style="--color: var(--bg)"></span></td>
            </tr>
            <tr class="optional">
                <td><code>animdur</code></td>
                <td>
                    The duration of the appearing animation of the iframe widget
                    in ms
                </td>
                <td><code>500</code></td>
            </tr>
        </tbody>
    </table>
    <note data-type="warning">
        <div class="title">
            <i class="nf nf-fa-circle_exclamation"></i> defining hex colors
        </div>
        <div class="content">
            <p>
                The hex color codes should be passed without the <code>#</code>
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
