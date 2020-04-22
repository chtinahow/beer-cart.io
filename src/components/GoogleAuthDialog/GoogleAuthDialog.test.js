import GoogleAuthDialog from './GoogleAuthDialog'

describe('GoogleAuthDialog', () => {
  describe('with default props', () => {
    const wrapper = GoogleAuthDialog()

    it('should match snapshot', () => {
      expect(wrapper.outerHTML).toMatchSnapshot()
    })
  })
})
