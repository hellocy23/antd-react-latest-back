import React from 'react'
// import { Route, BrowserRouter as Router } from 'react-router-dom'
//使用hash路由
import { Route, HashRouter as Router } from 'react-router-dom'
import routes from 'routes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

@connect(
    state => state.getIn(['global']),
    dispatch => bindActionCreators({  }, dispatch)
)
class App extends React.Component {

    render () {
        
        return (
          <Router>
              <div>
                    {
                        routes.map((r, key) => {
                            return (
                                <Route
                                    render={props => (<r.component {...props} routes={r.routes} />)}
                                    exact={!!r.exact}
                                    key={r.path + key}
                                    path={r.path}
                                />
                            )
                        })
                    }
              </div>
          </Router>
      )
  }
}
export default App
