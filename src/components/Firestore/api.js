import { raw } from 'tram-one'

// remove all empty conversations from the database
export const cleanupEmptyConversations = roomData => {
	// find conversations that are empty (don't include no-conversation)
	const hasNoUsers = conversation => conversation.users.length === 0 && conversation.link !== ''
	const emptyConversations = roomData.conversations
		.map((conv, index) => ({ index, conv }))
		.filter(({ conv }) => hasNoUsers(conv))

	// we are removing from the back, so that splice does not remove a good conversation
	const removeConversation = ({ index }) => roomData.conversations.splice(index, 1)
	emptyConversations.reverse().forEach(removeConversation)
}

export const resetMockData = roomRef => {
	const mockUsers = {
		kai: { name: 'Kai', avatar: 'https://scontent.fphl1-1.fna.fbcdn.net/v/t1.0-1/p160x160/70126637_2547330071992156_5555417816577867776_o.jpg?_nc_cat=100&_nc_sid=dbb9e7&_nc_ohc=sGaQoJNroMsAX8pJH25&_nc_ht=scontent.fphl1-1.fna&_nc_tp=6&oh=eb13e5342e18c114f0e347236c75baf1&oe=5EB78DD1' },
		randy: { name: 'Randy', avatar: 'https://scontent.fphl1-1.fna.fbcdn.net/v/t1.0-1/p240x240/32670645_10209265337230517_1075909150396907520_o.jpg?_nc_cat=110&_nc_sid=dbb9e7&_nc_ohc=g6ecFeCDtWgAX-SP0-A&_nc_ht=scontent.fphl1-1.fna&_nc_tp=6&oh=4bb15421981757328ad7e5012258bcb8&oe=5EB976FC' },
		molly: { name: 'Molly', avatar: 'https://scontent.fphl1-2.fna.fbcdn.net/v/t1.0-1/c0.27.160.160a/p160x160/72944514_10220171552695789_5972680722677235712_o.jpg?_nc_cat=104&_nc_sid=dbb9e7&_nc_ohc=ItLUVcObXZ0AX84stSN&_nc_ht=scontent.fphl1-2.fna&oh=5e7ed43e1ad13eece8d8c9d229af0772&oe=5EBA5E1C' },
		tim: { name: 'Tim', avatar: 'https://scontent.fphl1-1.fna.fbcdn.net/v/t31.0-1/p240x240/20745943_10209890595206463_1494104107463094461_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=F-e4Gz0kxKoAX8TnQAD&_nc_ht=scontent.fphl1-1.fna&_nc_tp=6&oh=fe8892601c8fa6c0a4cba0368af7bd27&oe=5EB85DA8' },
		nick: { name: 'Nick', avatar: 'https://scontent.fphl1-2.fna.fbcdn.net/v/t1.0-1/p240x240/58383003_10215260916095384_3163124253931339776_n.jpg?_nc_cat=101&_nc_sid=dbb9e7&_nc_ohc=Qoudq-4ZBE8AX-N9-KR&_nc_ht=scontent.fphl1-2.fna&_nc_tp=6&oh=b14b09dc2369c210e9e1c58db1b72b49&oe=5EB9492D' },
		preston: { name: 'Preston', avatar: 'https://scontent.fphl1-1.fna.fbcdn.net/v/t1.0-1/p240x240/74234796_10206411670008540_925929532370714624_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=QonUtD6lJNsAX_0o9qD&_nc_ht=scontent.fphl1-1.fna&_nc_tp=6&oh=adcbd27c4c79943102357a423c2b7564&oe=5EB7CF75' },
		george: { name: 'George', avatar: 'https://scontent.fphl1-1.fna.fbcdn.net/v/t1.0-1/p240x240/33462587_10211900032083930_6283782499759816704_o.jpg?_nc_cat=105&_nc_sid=dbb9e7&_nc_ohc=u0-zirTXmWMAX8PWPcl&_nc_ht=scontent.fphl1-1.fna&_nc_tp=6&oh=3581c2114fc6aeaf99953d5643f36f54&oe=5EB86F8B' }
	}
	const mockData = {
		id: 'cr-1234',
		roomName: 'Testing Fun Times',
		conversations: [
			// converstaion with blank link is no-group
			{ users: [mockUsers.randy, mockUsers.george], link: '' },
			{ users: [mockUsers.preston, mockUsers.nick, mockUsers.kai], link: 'https://meet.google.com/sin-kead-jfc?authuser=1' },
			{ users: [mockUsers.molly, mockUsers.tim], link: 'https://hangouts.google.com/call/N2h_j1SJWOKbp-b5gaFzAEEE' }
		]
	}
	roomRef.set(mockData)
}

export const isInRoom = (roomData, user) => {
	// if roomData or user are undefined, return false
	if (!roomData || !user) return false

	// read the room and see if the email is already in the room
	const allUsers = roomData.conversations.flatMap(conv => conv.users)
	const allEmails = allUsers.map(user => user.email)
	return allEmails.includes(user.email)
}

/* add the current user into the room */
export const joinRoom = (roomData, roomRef, user) => {
	// don't do anything if the user is already in the room
	if (isInRoom(roomData, user)) {
		return
	}

	const roomDataCopy = raw(roomData)
	// user was not in the room, add them to no-conversation group
	// search for the conversation that has no link (the no-group)
	const noLinkConversation = roomDataCopy.conversations.find(conv => conv.link === '')

	// push user by default into this group
	noLinkConversation.users.push(user)

	roomRef.set(roomDataCopy)
}

export const leaveRoom = (roomData, roomRef, user) => {
	// don't do anything if the user is not already in the room
	if (!isInRoom(roomData, user)) return

	const roomDataCopy = raw(roomData)

	// find the conversation that the user is already in
	const isUserInConversation = conversation => conversation.users.map(convUser => convUser.email).includes(user.email)
	const usersExistingConversation = roomDataCopy.conversations.find(isUserInConversation)

	// update existing user's conversation to not have user
	const userIndex = usersExistingConversation.users.findIndex(convUser => convUser.email === user.email)

	// returns a function that we can call the instant that we want to perform the operation
	return () => {
		usersExistingConversation.users.splice(userIndex, 1)

		// cleanup if they were the last one out
		cleanupEmptyConversations(roomDataCopy)

		roomRef.set(roomDataCopy)
	}
}

export const createConversation = (roomData, roomRef, user, conversationLink) => {
	const roomDataCopy = raw(roomData)
	// find the conversation that the user is already in
	const isUserInConversation = conversation => conversation.users.map(convUser => convUser.email).includes(user.email)
	const usersExistingConversation = roomDataCopy.conversations.find(isUserInConversation)

	// update existing user's conversation to not have user
	const userIndex = usersExistingConversation.users.findIndex(convUser => convUser.email === user.email)
	usersExistingConversation.users.splice(userIndex, 1)

	// cleanup if they were the last one out
	cleanupEmptyConversations(roomDataCopy)

	// create the new conversation
	roomDataCopy.conversations.push({
		link: conversationLink,
		users: [user]
	})

	roomRef.set(roomDataCopy)
}

export const joinConversation = (roomData, roomRef, user, conversationLink) => {
	const roomDataCopy = raw(roomData)

	// find the conversation that the user is already in
	const isUserInConversation = conversation => conversation.users.map(convUser => convUser.email).includes(user.email)
	const usersExistingConversation = roomDataCopy.conversations.find(isUserInConversation)

	// update existing user's conversation to not have user
	const userIndex = usersExistingConversation.users.findIndex(convUser => convUser.email === user.email)
	usersExistingConversation.users.splice(userIndex, 1)

	// cleanup if they were the last one out
	cleanupEmptyConversations(roomDataCopy)

	// find the conversation that they want to be in
	const selectedConversation = roomDataCopy.conversations.find(conv => conv.link === conversationLink)
	// if we couldn't find conversation, don't update data
	if (!selectedConversation) {
		return
	}

	// update the selected conversation to have the user
	selectedConversation.users.push(user)
	roomRef.set(roomDataCopy)
}

export const leaveConversation = (roomData, roomRef, user) => {
	const roomDataCopy = raw(roomData)

	// find the conversation that the user is already in
	const isUserInConversation = conversation => conversation.users.map(convUser => convUser.email).includes(user.email)
	const usersExistingConversation = roomDataCopy.conversations.find(isUserInConversation)

	// update existing user's conversation to not have user
	const userIndex = usersExistingConversation.users.findIndex(convUser => convUser.email === user.email)
	usersExistingConversation.users.splice(userIndex, 1)

	// cleanup if they were the last one out
	cleanupEmptyConversations(roomDataCopy)

	// update the no-group conversation to have user
	const emptyConversation = roomDataCopy.conversations.find(conv => conv.link === '')

	// update the selected conversation to have the user
	emptyConversation.users.push(user)
	roomRef.set(roomDataCopy)
}

export const renameConversation = (roomData, roomRef, conversationLink, title) => {
	const roomDataCopy = raw(roomData)

	// find the conversation that we want to rename
	const selectedConversation = roomDataCopy.conversations.find(conv => conv.link === conversationLink)

	// if we couldn't find conversation, don't update data
	if (!selectedConversation) {
		return
	}

	// update the selected conversation to name
	selectedConversation.title = title
	roomRef.set(roomDataCopy)
}
