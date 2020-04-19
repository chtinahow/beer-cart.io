import { registerHtml } from 'tram-one'
import './PrivacyPolicyPage.scss'

const html = registerHtml()

export default (props, children) => {
	return html`
    <div class="PrivacyPolicyPage Page">
			<h1>Privacy Policy</h1>
			<p>
				Thank you for using beer-cart.io! We understand that privacy is important.
				We also understand that a privacy policy is required by some services!

				In lieu of using a more formal document of gobbily-gook-mumbo-jumbo,
				we have opted to answer the common questions here, in as plain and straight-forward way as possible.
				If you need more clarification, or would like to better understand how data is used beyond what is described here,
				feel free to email us at <a href="mailto:jesse@beer-cart.io">jesse@beer-cart.io</a>
			</p>

			<h3>What information do we collect?</h3>
			<p>
				When you sign into google on our page, google may keep track of your usage with our application.
				This interaction is exclusively stored on google's console, and not on any service or database owned by beer-cart.io.
				When you join a room or conversation, we store your email, name, and google profile picture into a firebase database.
			</p>

			<h3>How do we use your information?</h3>
			<p>
				Any information stored by us is used exclusively for presentation purposes, and to enable user-to-user communications.
				It is so that other users interacting with beer-cart.io may see your name and profile picture when interacting with the service.
			</p>

			<h3>How long do we keep your information?</h3>
			<p>
				We keep any information collected for as long as your session is with the site.
				Once you leave a session, your information is removed from our databases.
			</p>

			<h3>Will your information be shared with anyone?</h3>
			<p>
				Nope.
			</p>

			<h3>How do we keep your information safe?</h3>
			<p>
				We follow the standards and recommendations with the tools we are using (Google and Firebase).
				We do not share or submit user data to places or through channels that are not required.
				In this way, we wish to minimize the potential for your data to be compromised.
			</p>

			<h3>How can you contact us about this policy?</h3>
			<p>
				For inquries about this policy, and any non-technical question, you can send an email to <a href="mailto:jesse@beer-cart.io">jesse@beer-cart.io</a>.
				<br/>
				If you have technical questions or concerns, you may also create an issue on our repository here <a href="https://github.com/chtinahow/beer-cart.io/issues/new">github.com/chtinahow/beer-cart.io</a>.
				<br/><br/>
				NOTE: Github issues created are on a public repository, and will be visible to all online users. If your concern is more personal, or may put other users at risk, we strongly suggest emailing us first.
			</p>
    </div>
  `
}
