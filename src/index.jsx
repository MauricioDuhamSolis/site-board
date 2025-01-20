import {Auth0Provider} from '@auth0/auth0-react'
import {createBrowserHistory} from 'history'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {customDebug} from './utils/custom.debug'


const browserHistory = createBrowserHistory()

const onRedirectCallback = (appState) => {
  customDebug().log('index#onRedirectCallback: appState: ', appState)
  customDebug().log('index#onRedirectCallback: window.location.pathname: ', window.location.pathname)
  browserHistory.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname,
  )
}

const domain = import.meta.env.VITE_AUTH_DOMAIN
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID
const audience = import.meta.env.VITE_AUTH_AUDIENCE

const providerConfig = {
  domain,
  clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(audience ? {audience} : null),
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <App />,
    </Auth0Provider>
  </React.StrictMode>,
)
