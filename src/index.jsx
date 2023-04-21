import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserHistory} from 'history'
import App from './App'
import authConfig from './backend/auth.config.json'
import './index.css'
import {Auth0Provider} from '@auth0/auth0-react'


const browserHistory = createBrowserHistory()


const onRedirectCallback = (appState) => {
  browserHistory.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname,
  )
}


const providerConfig = {
  domain: authConfig.domain,
  clientId: authConfig.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(authConfig.audience ? {audience: authConfig.audience} : null),
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Auth0Provider {...providerConfig}>
        <App/>
      </Auth0Provider>
    </React.StrictMode>,
)
