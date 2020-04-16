import { registerHtml, useGlobalObservable } from 'tram-one'
import './Hero.scss'

const html = registerHtml()

export default (props, children) => {
	const [showJoinPrompt, setJoinPrompt] = useGlobalObservable('join-prompt', false)
	const [showCreatePrompt, setCreatePrompt] = useGlobalObservable('create-prompt', false)

	const onJoinRoom = () => {
		setJoinPrompt(true)
	}

	const onCreateRoom = () => {
		setCreatePrompt(true)
	}

	return html`
    <header class="Hero">
      <h1 class="title">BeercartIO is a lobby for your virtual hangouts</h1>
      <h2 class="subtitle">Works with Google Hangouts and Google Hangouts Meet</h2>
      <button onclick=${onCreateRoom} class="button button-primary">Create a Room</button>
      <button onclick=${onJoinRoom} class="button button-info">Join a Room</button>
    </header>
  `
}
