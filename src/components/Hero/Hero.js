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
    <div class="Hero">
      <h1 class="title">A lobby for your<br/> virtual hangouts</h1>
      <p class="subtitle">
				Start organized and casual virtual sessions<br/>
				with groups large and small! Works with<br/>
				Google Hangouts and Google Hangouts Meet.
			</p>
			<div class="hero-actions">
				<button onclick=${onCreateRoom} class="button button-info">Create a Room</button>
				<button onclick=${onJoinRoom} class="button button-primary">Join a Room</button>
			</div>
    </div>
  `
}
