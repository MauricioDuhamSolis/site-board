import {IS_DEV_MODE} from '../utils/constants'


export const authConfig = IS_DEV_MODE ?
{
  domain: 'dev-ku6ur1mt530rft6t.us.auth0.com',
  clientId: 'vnaVUHcNstsBWh2cFAZs2btEqbaIX9DO',
  audience: 'https://dev-ku6ur1mt530rft6t.us.auth0.com/api/v2/',
} : {
  domain: 'dev-ku6ur1mt530rft6t.us.auth0.com',
  clientId: '4UWwNqhkVMrVnwas9YVpOr1eLcqeyYBJ',
  audience: 'https://dev-ku6ur1mt530rft6t.us.auth0.com/api/v2/',
}
