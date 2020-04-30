import InvalidRoomPage from './InvalidRoomPage'

describe('InvalidRoomPage', () => {
  describe('with default props', () => {
    const wrapper = InvalidRoomPage()

    it('should match snapshot', () => {
      expect(wrapper.outerHTML).toMatchSnapshot()
    })
  })
})
