import LoginControl from './LoginControl'

describe('LoginControl', () => {
  describe('with default props', () => {
    const wrapper = LoginControl()

    it('should match snapshot', () => {
      expect(wrapper.outerHTML).toMatchSnapshot()
    })
  })
})
