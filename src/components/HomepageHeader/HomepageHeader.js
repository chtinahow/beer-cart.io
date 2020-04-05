import { registerHtml } from 'tram-one'

const html = registerHtml()

export default (props, children) => {
	return html`
        <div>
            <button class="button-primary button-purple">Create a Room</button>
            <button class="button-primary button-round">Join a Room</button>
        </div>
  `
}
