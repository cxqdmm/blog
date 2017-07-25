import router from './router.js'

let RootRoute = {
	childRoutes: [
		router,
		{path: '*',
			getComponent(nextState, cb) {
				require.ensure([], (require) => {
					cb(null, require('../views/empty'))
				}, "empty")
			}}			
			]
}
export default RootRoute