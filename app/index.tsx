import dva from 'dva'
import routes from './routes';
import count from './models/count'
import './app.global.scss'

// const { configureStore, history } = require('./store/configureStore')

const app = dva()

app.model(count)
app.router(routes)
app.start('#root')
// const store = configureStore()

// render(
//   <AppContainer>
//     <Root store={store} history={history} />
//   </AppContainer>,
//   document.getElementById('root')
// )

// if ((module as any).hot) {
//   ;(module as any).hot.accept('./containers/Root', () => {
//     const NextRoot = require('./containers/Root').default
//     render(
//       <AppContainer>
//         <NextRoot store={store} history={history} />
//       </AppContainer>,
//       document.getElementById('root')
//     )
//   })
// }
