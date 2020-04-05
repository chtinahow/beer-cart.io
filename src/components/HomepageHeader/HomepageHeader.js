import { registerHtml } from 'tram-one'

const html = registerHtml()

export default (props, children) => {
	return html`
    <div>
      <header>
        <h1 class="title">BeercartIO is a lobby for your virtual hangouts</h1>
        <h2 class="subtitle">Works with Google Hangouts and Google Hangouts Meet</h2>
        <button class="button button-primary">Create a Room</button>
        <button class="button button-info">Join a Room</button>
      </header>
    </div>
  `
}
