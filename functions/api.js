/* NOTE: functions added here need to be written in the firebase.json rewrites */

const getRoom = (request, response) => {
	const roomId = request.url.split('/').slice(-1)[0]

	// if room does not exist, return a 404
	// TODO check roomId against db
	const roomDoesNotExist = roomId !== 'vr-1234'
	if (roomDoesNotExist) {
		response.status(404).send({ errorKey: 'error.roomNotFound', errorMessage: 'Room Not Found, is the ID Correct?' })
		return
	}

	// TODO hit database for room data
	response.send({
		id: 'vr-1234',
		roomName: 'Virtual Fun Times',
		conversations: [
			// converstaion with blank link is no-group
			{ users: [{ name: 'Randy', avatar: null }, { name: 'George', avatar: null }], link: '' },
			{ users: [{ name: 'Jesse', avatar: null }, { name: 'Tina', avatar: null }, { name: 'Sprocket', avatar: null }, { name: 'Nick', avatar: null }, { name: 'Mitch', avatar: null }], link: 'https://meet.google.com/sin-kead-jfc?authuser=1' },
			{ users: [{ name: 'Molly', avatar: null }, { name: 'Tim', avatar: null }, { name: 'Kai', avatar: null }], link: 'https://meet.google.com/sin-kead-jfc?authuser=1' }
		]
	})
}

module.exports = {
	getRoom
}
