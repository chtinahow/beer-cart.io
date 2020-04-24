import LoadingIndicator from './LoadingIndicator'

describe('LoadingIndicator', () => {
  describe('with default props', () => {
    const wrapper = LoadingIndicator()

    it('should match snapshot', () => {
      expect(wrapper.outerHTML).toMatchSnapshot()
    })
  })
})
