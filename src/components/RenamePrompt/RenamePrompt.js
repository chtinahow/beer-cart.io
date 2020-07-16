import { registerHtml, useGlobalObservable } from 'tram-one'
import { renameConversation } from '../Firestore'
import './RenamePrompt.scss'

const html = registerHtml({})

export default (props, children) => {
	// const [showRenamePrompt, setRenamePrompt] = useGlobalObservable('rename-prompt', false)
	const [renamingConversationLink, setRenamingConversationLink] = useGlobalObservable('renaming-conversation-link')
	const [roomData] = useGlobalObservable('room-data')
	const [roomRef] = useGlobalObservable('room-ref')

	const onDismiss = () => {
		setRenamingConversationLink(null)
	}

	const onRenameConversation = async event => {
		event.preventDefault()
		const form = event.target
		const newTitle = form.conversationName.value
		renameConversation(roomData, roomRef, renamingConversationLink, newTitle)
		setRenamingConversationLink(null)
	}

	// show empty prompt if we haven't set a link yet
	if (!renamingConversationLink) {
		return html`<div class="RenamePrompt" />`
	}

	const conversation = roomData.conversations.find(conversation => conversation.link === renamingConversationLink)
	const currentTitle = conversation.title || conversation.users.map(user => user.name).join(', ')

	return html`
    <div class="RenamePrompt">
    <div class="modal-mask">
        <div class="modal">
          <div class="modal-head">
              <p class="modal-title">Rename a Conversation</p>
          </div>
					<!-- form for interacting with the input and handling the enter / click actions -->
					<form onsubmit=${onRenameConversation}>
						<div class="modal-body">
								<div class="form-control">
										<label for="conversationName">Conversation Name</label>
										<input type="text" id="conversationName" name="conversationName" autofocus placeholder=${currentTitle} />
								</div>
						</div>
						<div class="modal-footer RenamePrompt-controls">
								<input type="submit" class="button-primary" value="Change" />
								<button onclick=${onDismiss} class="button-info">Cancel</button>
						</div>
					</form>
        </div>
      </div>
    </div>
  `
}
