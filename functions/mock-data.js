/* mock data */
const mockUsers = {
	kai: { name: 'Kai', avatar: 'https://scontent.fphl1-1.fna.fbcdn.net/v/t1.0-1/p160x160/70126637_2547330071992156_5555417816577867776_o.jpg?_nc_cat=100&_nc_sid=dbb9e7&_nc_ohc=sGaQoJNroMsAX8pJH25&_nc_ht=scontent.fphl1-1.fna&_nc_tp=6&oh=eb13e5342e18c114f0e347236c75baf1&oe=5EB78DD1' },
	randy: { name: 'Randy', avatar: 'https://scontent.fphl1-1.fna.fbcdn.net/v/t1.0-1/p240x240/32670645_10209265337230517_1075909150396907520_o.jpg?_nc_cat=110&_nc_sid=dbb9e7&_nc_ohc=g6ecFeCDtWgAX-SP0-A&_nc_ht=scontent.fphl1-1.fna&_nc_tp=6&oh=4bb15421981757328ad7e5012258bcb8&oe=5EB976FC' },
	jesse: { name: 'Jesse', avatar: 'https://scontent.fphl1-1.fna.fbcdn.net/v/t1.0-1/p240x240/10305075_10203019144734776_7918379453353095882_n.jpg?_nc_cat=108&_nc_sid=dbb9e7&_nc_ohc=DunqJsYj4D0AX9cR_ro&_nc_ht=scontent.fphl1-1.fna&_nc_tp=6&oh=f9dc21d1e3ef6b204845356e0a96a17b&oe=5EB73010' },
	tina: { name: 'Tina', avatar: 'https://scontent.fphl1-2.fna.fbcdn.net/v/t1.0-1/p240x240/74830294_10215642675763208_6887210922218094592_o.jpg?_nc_cat=111&_nc_sid=dbb9e7&_nc_ohc=ImvD9VzLt5cAX_bY4LJ&_nc_ht=scontent.fphl1-2.fna&_nc_tp=6&oh=b85c8b186e1d60549ab14b26280b2ab2&oe=5EB9752D' },
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
		{ users: [mockUsers.jesse, mockUsers.tina, mockUsers.preston, mockUsers.nick, mockUsers.kai], link: 'https://meet.google.com/sin-kead-jfc?authuser=1' },
		{ users: [mockUsers.molly, mockUsers.tim], link: 'https://meet.google.com/sin-kead-jfc?authuser=1' }
	]
}

module.exports = mockData
