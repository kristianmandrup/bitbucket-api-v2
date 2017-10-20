import test from 'ava'
import supertest from 'supertest'

// https://bitbucket.org/site/oauth2/authorize?client_id={client_id}&response_type=code

let connection = supertest('https://bitbucket.org')

const {
  log
} = console

test.only('authorize', async t => {
  console.log('try authorize:')
  try {
    let result = await connection
      .get('/site/oauth2/authorize')
      .query({
        client_id: 'z9D3A3XrNFPjPwh9zx',
        response_type: 'code'
      })
      .expect(302)
    log('authorize result:', {
      result
    })
  } catch (err) {
    log(err)
  }
})
// $ curl -X POST -u "client_id:secret" \
// https://bitbucket.org/site/oauth2/access_token \
// -d grant_type=authorization_code -d code={code}

test('access token', async t => {
  console.log('send access token:')
  let accessToken = 'xxxyyy'
  try {
    let result = await connection
      .post('site/oauth2/access_token')
      .auth('z9D3A3XrNFPjPwh9zx', '2R8n5QP3fU4ptVut9QRPz6zjAxfUNqLA')
      .field('grant_type', 'authorization_code')
      .field('code', accessToken)
      .expect(200)
    log('access token result:', {
      result
    })
  } catch (err) {
    log(err)
  }
})

// curl - X POST - H "Authorization: JWT {jwt_token}"
// https: //bitbucket.org/site/oauth2/access_token \
//   -d grant_type = urn: bitbucket: oauth2: jwt

test('JWT auth', async t => {
  console.log('send JWT token:')
  let jwtToken = 'xxxyyy'
  try {
    let result = await connection
      .post('site/oauth2/access_token')
      .header({
        'Authorization': `JWT ${jwtToken}`
      })
      .auth('z9D3A3XrNFPjPwh9zx', '2R8n5QP3fU4ptVut9QRPz6zjAxfUNqLA')
      .field('grant_type', 'urn:bitbucket:oauth2:jwt')
      .expect(200)
    log('JWT token result:', {
      result
    })
  } catch (err) {
    log(err)
  }
})
