import { Router, Route, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'

const routerConfig = ({ history, app }) => {
  const BaseLayout = dynamic({ app, models: () => [import('./models/sys/sys')], component: () => import('./components/layout/baseLayout') })
  const Login = dynamic({ app, models: () => [import('./models/account/login')], component: () => import('./routes/account/login') })
  const Exception404 = dynamic({ app, component: () => import('./routes/exception/404') })
  const Exception500 = dynamic({ app, component: () => import('./routes/exception/500') })
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={BaseLayout} />
        <Route path='/account/login' exact component={Login} />
        <Route path='/exception/404' exact component={Exception404} />
        <Route path='/exception/500' exact component={Exception500} />
      </Switch>
    </Router>
  )
}

export default routerConfig;
