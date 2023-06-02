import {IS_DEV_MODE} from '../utils/constants'


export const authConfig = IS_DEV_MODE ?
  {
    domain: 'dev-ku6ur1mt530rft6t.us.auth0.com',
    clientId: 'IT4ZO5LK6J8xgb6XUaf9FSP4bzJhbnkv',
    audience: 'https://dev-ku6ur1mt530rft6t.us.auth0.com/api/v2/',
  } : {
    domain: 'dev-ku6ur1mt530rft6t.us.auth0.com',
    clientId: 'Aqx55ue1rpneXpfKOs9VWMYZQUh65hwJ',
    audience: 'https://dev-ku6ur1mt530rft6t.us.auth0.com/api/v2/',
  }
