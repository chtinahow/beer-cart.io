import { getByRole, fireEvent } from '@testing-library/dom'
import 'regenerator-runtime/runtime'

describe('app', () => {
	beforeAll(() => {
		// setup the element for the page to mount on
		const mockApp = document.createElement('div')
		mockApp.id = 'app'
		document.body.appendChild(mockApp)

		require('../src')
	})

	it('should mount the app with a header', () => {
		expect(getByRole(document, 'heading').innerHTML).toMatch('beer-cart.io')
	})

	it('should update the color on click', () => {
		// click on the header
		fireEvent.click(getByRole(document, 'heading'))

		expect(getByRole(document, 'heading').style.color).toMatch('rgb(159, 239, 161)')
	})
})
