/**
 * There is no official Hangouts API for creating and deleting hangout calls.
 * However, it is possible to create a calendar event, with conferencing, get the link, and then delete the event
 */
import { useUrlParams } from 'tram-one'
import { createEvent, deleteEvent } from './useGoogleAPI'

const eventDetails = {
	summary: 'beer-cart.io',
	description: 'GENERATED beer-cart.io EVENT',
	start: {
		dateTime: (new Date()).toISOString()
	},
	end: {
		dateTime: (new Date()).toISOString()
	},
	sendUpdates: 'none',
	conferenceData: {
		// client-generated unique ID for this request
		// if the ID provided is the same as a previous request, it is ignored
		// TODO potentiall randomize this?
		createRequest: { requestId: '7qxalsvy0e' }
	}
}

export default () => {
	return new Promise((resolve, reject) => {
		// create a new event with conferencing
		try {
			const createRequest = createEvent({
				calendarId: 'primary',
				resource: eventDetails,
				conferenceDataVersion: 1
			})

			// execute the request to create the event
			createRequest.execute(event => {
				// note the event hangout may not exist yet,
				// TODO include logic to handle hangout status = pending

				// set the hangout link from the event
				resolve(event.hangoutLink)

				// if we are in t test room, don't delete the event
				if (useUrlParams('/room/cr-1234')) return

				// delete the event, leave no traces
				const deleteRequest = deleteEvent({
					calendarId: 'primary',
					eventId: event.id,
					sendUpdates: 'none'
				})
				deleteRequest.execute()
			})
		} catch (error) {
			console.error('Error Creating Hangout Link or Event')
			console.error(error)
			reject(error)
		}
	})
}
