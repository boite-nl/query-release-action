// @ts-ignore
import nock from 'nock';
// @ts-ignore
import * as fixtures from './fixtures/init.test';

import * as oct from '../src/octo'

const GitHubEndpoint: string = 'https://api.github.com';
const AuthScope: string = '/app/installations/2/access_tokens';

describe('oct: test suite', () => {
  beforeAll(() => {
    fixtures.initTestEnv();
  });
  afterAll(() => {
    fixtures.cleanTestEnv();
  });
  beforeEach(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  })

  test('should instantiate github client', async () => {
    nock(GitHubEndpoint)
      .post(AuthScope)
      .reply(200, { token: 'test' });
    const token: string = process.env.TEST_GITHUB_TOKEN!
    await oct.client(token);
  });
})
