import dva from 'dva'
import { createHashHistory } from 'history'
import createLoading from 'dva-loading'
import './index.less'

// 1. Initialize
const app = dva({
    history: createHashHistory({
        hashType: 'slash'
    })
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model();

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store;