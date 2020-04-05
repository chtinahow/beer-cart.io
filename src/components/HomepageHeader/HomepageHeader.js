import { registerHtml } from 'tram-one'

const html = registerHtml()

export default (props, children) => {
	return html`
    <div>
      <header>
        <h1 class="title">Space for your headline.</h1>
        <h2 class="subtitle">A space for a more descriptive subtitle.</h2>
        <p class="disclaimer">A small space for a disclaimer.</p>
        <button class="get-started button button-primary button-large">Call to Action</button>

        <a class="scroll-down" href="#"></a>
      </header>

      <section>
        <p class="h3"><strong>Get More</strong></p>
        <p>This is an examples of header styles that are used in Mustard UI.  We like to think of it as a starter CSS framework that actually looks good.  We'd love to hear your feedback!</p>
        <p>See more examples of <a href="https://mustard-ui.com/docs/header">CSS Header Styles</a>.</p>
      </section>
    </div>
  `
}
