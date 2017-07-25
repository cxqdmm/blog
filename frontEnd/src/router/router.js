let menuRouteDataList = {
    key: 'root',
    path: '/',
    indexRoute: {
        onEnter: (nextState, replace) => replace('/index')
    },
    component: require('../views/center'),
    childRoutes: [
        {
            path: 'index',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('../views/index'))
                }, "index")
            },
                    
        }
    ]
}
module.exports = menuRouteDataList;