import {IS_DEV_MODE} from '../utils/constants'


export const authConfig = IS_DEV_MODE ?
{
  domain: 'dev-rqzc417axamwy78e.us.auth0.com',
  clientId: '7z1MHCx4k4ZUMfpdUDFEVluc6D6NXXsY',
  audience: 'https://dev-rqzc417axamwy78e.us.auth0.com/api/v2/',
} : {
  domain: 'dev-rqzc417axamwy78e.us.auth0.com',
  clientId: 'IwW12s391bnpX47wK08TaVew5S4IXhXy',
  audience: 'https://dev-rqzc417axamwy78e.us.auth0.com/api/v2/',
}
