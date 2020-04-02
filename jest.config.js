module.exports = {
	// include testing-library matchers
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

	// allow Mutation-Observer (which Tram-One depends on) to work
	testEnvironment: 'jest-environment-jsdom-fourteen',

	// enable css processing
	transform: {
		'^.+\\.js$': 'babel-jest',
		'\\.(s?css|less)$': 'jest-transform-css'
	}
}
