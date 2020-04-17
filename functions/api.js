const getRoom = database => async (request, response) => {
	const roomId = request.url.split('/').slice(-1)[0]
	try {
		const roomData = await database.collection('rooms').doc(roomId).get()

		// check that the room exists, otherwise throw a 404
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

const createRoom = database => (request, response) => {
	// read the request body to read the room title
	// generate room
}

const joinRoom = database => async (request, response) => {
	const { roomId, user } = JSON.parse(request.body)

	const roomRef = database.collection('rooms').doc(roomId)
	const room = await roomRef.get()
	if (!room.exists) {
		response.status(404).send({ errorKey: 'error.roomNotFound', errorMessage: 'Room Not Found, is the ID Correct?' })
		return
	}

	// check if the user is already in the room
	const roomData = room.data()
	const allUsers = roomData.conversations.flatMap(conv => conv.users).map(user => user.email)
	if (allUsers.includes(user.email)) {
		response.status(200).send(roomData)
		return
	}

	// user was not in the room, add them to no-conversation group
	// search for the conversation that has no link (the no-group)
	const noLinkConversation = roomData.conversations.find(conv => conv.link === '')

	// push user by default into this group
	noLinkConversation.users.push(user)
	await roomRef.set(roomData)

	response.send(roomData)
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
	getRoom, createRoom, joinRoom, leaveRoom, joinConversation, leaveConversation
}
