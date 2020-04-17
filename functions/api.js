// helper function to verify that the room exists
// if it does, return a reference, and a data object
const getRoomRefAndData = async (database, roomId, response) => {
	try {
		const roomRef = database.collection('rooms').doc(roomId)
		const room = await roomRef.get()
		if (!room.exists) {
			const error = { errorKey: 'error.roomNotFound', errorMessage: 'Room Not Found, is the ID Correct?' }
			response.status(404).send(error)
			return null
		}
		return { ref: roomRef, data: room.data() }
	} catch (error) {
		response.status(500).send({ errorKey: 'error.databaseConnection', errorMessage: 'There was an issue connecting to the database, try again later...', error })
	}
	return null
}

const getRoom = database => async (request, response) => {
	const roomId = request.url.split('/').slice(-1)[0]
	const room = await getRoomRefAndData(database, roomId, response)
	if (room) {
		response.send(room.data)
	}
}

const createRoom = database => (request, response) => {
	// read the request body to read the room title
	// generate room
}

const joinRoom = database => async (request, response) => {
	const { roomId, user } = JSON.parse(request.body)

	const room = await getRoomRefAndData(database, roomId, response)
	if (!room) return
	const { ref: roomRef, data: roomData } = room

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

	const room = await getRoomRefAndData(database, roomId, response)
	if (!room) return
	const { ref: roomRef, data: roomData } = room

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

const leaveConversation = database => async (request, response) => {
	// read request body to get the user information
	// read request body to get the user and conversation information
	const { roomId, user } = JSON.parse(request.body)

	const room = await getRoomRefAndData(database, roomId, response)
	if (!room) return
	const { ref: roomRef, data: roomData } = room

	// find the conversation that the user is already in
	const isUserInConversation = conversation => conversation.users.map(convUser => convUser.email).includes(user.email)
	const usersExistingConversation = roomData.conversations.find(isUserInConversation)

	// update existing user's conversation to not have user
	const userIndex = usersExistingConversation.users.findIndex(convUser => convUser.email === user.email)
	usersExistingConversation.users.splice(userIndex, 1)

	// update the no-group conversation to have user
	const emptyConversation = roomData.conversations.find(conv => conv.link === '')

	// update the selected conversation to have the user
	emptyConversation.users.push(user)
	await roomRef.set(roomData)

	response.send(roomData)
}

module.exports = {
	getRoom, createRoom, joinRoom, leaveRoom, joinConversation, leaveConversation
}
