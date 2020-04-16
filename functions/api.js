const getRoom = database => async (request, response) => {
	const roomId = request.url.split('/').slice(-1)[0]
	try {
		const roomData = await database.collection('rooms').doc(roomId).get()
		if (!roomData.exists) {
			response.status(404).send({ errorKey: 'error.roomNotFound', errorMessage: 'Room Not Found, is the ID Correct?' })
			return
		}
		response.send(roomData.data())
		return
	} catch (error) {
		response.status(500).send({ errorKey: 'error.databaseConnection', errorMessage: 'There was an issue connecting to the database, try again later...', error })
	}
}

const joinRoom = database => (request, response) => {
	console.log(request)
	response.send('OK')
	// read request body to get the user information
	// update the no-group conversation to have user
}

const leaveRoom = (request, response) => {
	// read request body to get the user information
	// update whatever conversation to not have the user
}

const joinConversation = (request, response) => {
	// read request body to get the user information
	// read request body to get conversation information
	// update the no-group conversation to not have user
	// update the selected conversation to have the user
}

const leaveConversation = (request, response) => {
	// read request body to get the user information
	// update the no-group conversation to have user
	// update the selected conversation to have the user
}

module.exports = {
	getRoom, joinRoom, leaveRoom, joinConversation, leaveConversation
}
