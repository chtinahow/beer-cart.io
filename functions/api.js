// const getRoomRefAndData = async (database, roomId) => {
// 	const roomRef = database.collection('rooms').doc(roomId)
// 	const room = await roomRef.get()
// 	if (!room.exists) {
// 		const error = { errorKey: 'error.roomNotFound', errorMessage: 'Room Not Found, is the ID Correct?' }
// 		response.status(404).send(error)
// 		return null
// 	}

// 	{ ref: roomRef, data: room.data() }
// }

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
		response.send(roomData)
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

const joinConversation = database => async (request, response) => {
	// read request body to get the user and conversation information
	const { roomId, user, conversationLink } = JSON.parse(request.body)

	const roomRef = database.collection('rooms').doc(roomId)
	const room = await roomRef.get()

	const roomData = room.data()
	// find the conversation that the user is already in
	const isUserInConversation = conversation => conversation.users.map(convUser => convUser.email).includes(user.email)
	const usersExistingConversation = roomData.conversations.find(isUserInConversation)

	// update existing user's conversation to not have user
	const userIndex = usersExistingConversation.users.findIndex(convUser => convUser.email === user.email)
	usersExistingConversation.users.splice(userIndex, 1)

	// find the conversation that they want to be in
	const selectedConversation = roomData.conversations.find(conv => conv.link === conversationLink)
	// if we couldn't find conversation, don't update data
	if (!selectedConversation) {
		response.status(404).send({ errorKey: 'error.conversationNotFound', errorMessage: 'Conversation Not Found, is it still open?' })
		return
	}

	// update the selected conversation to have the user
	selectedConversation.users.push(user)
	await roomRef.set(roomData)

	response.send(roomData)
}

const leaveConversation = (request, response) => {
	// read request body to get the user information
	// update the no-group conversation to have user
	// update the selected conversation to have the user
}

module.exports = {
	getRoom, createRoom, joinRoom, leaveRoom, joinConversation, leaveConversation
}
