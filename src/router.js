import { Router, Switch, Route } from 'dva/router'
import dynamic from 'dva/dynamic'

const routerConfig = ({ history, app }) => {
  const UserLayout = dynamic({ app, models: () => [import('./models/sys/menu')], component: () => import('./components/layout/UserLayout') })
  const Menu = dynamic({ app, component: () => import('./routes/sys/Menu') })
  const Login = dynamic({ app, models: () => [import('./models/account/login')], component: () => import('./routes/account/Login') })
  const Exception404 = dynamic({ app, component: () => import('./routes/exception/Exception404') })
  const Exception500 = dynamic({ app, component: () => import('./routes/exception/Exception500') })
  return (
    <Router history={history}>
      <Switch>
        <UserLayout>
          <Route exact path='/menu' component={Menu} />
          <Route exact path='/exception/404' component={Exception404} />
          <Route exact path='/exception/500' component={Exception500} />
          <Route exact path='/account/login' component={Login} />
        </UserLayout>
      </Switch>
    </Router>
  )
}

export default routerConfig
