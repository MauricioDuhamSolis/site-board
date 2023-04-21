import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import authConfig from './backend/auth.config.json'
import './index.css'
import {Auth0Provider} from '@auth0/auth0-react'


const providerConfig = {
  domain: authConfig.domain,
  clientId: authConfig.clientId,
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
