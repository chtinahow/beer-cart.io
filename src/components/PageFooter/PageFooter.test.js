import PageFooter from './PageFooter'

describe('PageFooter', () => {
  describe('with default props', () => {
    const wrapper = PageFooter()

    it('should match snapshot', () => {
      expect(wrapper.outerHTML).toMatchSnapshot()
    })
  })
})
