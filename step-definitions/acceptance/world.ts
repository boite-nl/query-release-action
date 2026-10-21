import { World } from '@cucumber/cucumber'
import nock from 'nock'
import { Releases } from '../../src/github/get-releases'
import { Query } from '../../src'
import { Inputs } from '../../src/input'

interface WorldParameters {
  token: string
  repo: string
  owner: string
}
type Methods = 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'options' | 'merge'

const GitHubEndpoint: string = 'https://api.github.com'
const AuthScope: string = '/app/installations/2/access_tokens';

// @actions/github calls undici's own fetch (with a proxy dispatcher), which
// nock cannot intercept. Route it through the global fetch, which nock can.
// `require` (not `import * as`) so we patch the module instance it shares.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const undici = require('undici')
const undiciFetch = undici.fetch
const interceptableFetch = (url: any, {dispatcher, ...opts}: any = {}) =>
  globalThis.fetch(url, opts)

export class GithubWorld extends World<WorldParameters> {
  readonly token: string
  readonly repo: string
  readonly owner: string
  private nock?: nock.Scope

  constructor(options) {
    super(options)
    this.token = options.token || 'test-token'
    this.repo = options.repo || 'repo'
    this.owner = options.owner || 'owner'
  }

  private setup(apiUrl):nock.Scope {
    return nock(apiUrl)
  }

  private setupAuthScope(authScope: string):nock.Scope {
    return this.mockRequest('post', authScope, 200, { token: 'test' })
  }

  before(endpoint?: string, authScope?: string) {
    undici.fetch = interceptableFetch
    nock.disableNetConnect()

    this.nock = this.setup(endpoint || GitHubEndpoint)
    return (this.nock = this.setupAuthScope(authScope || AuthScope))
  }

  after() {
    nock.cleanAll()
    nock.enableNetConnect()
    undici.fetch = undiciFetch
    this.nock = undefined
  }

  mockRequest(method: Methods, path: string, statusCode: number, response: nock.Body, headers?: nock.ReplyHeaders): nock.Scope {
    return this.setMock(
      this.getMock()
        .replyContentLength()[method](path)
        .query(true)
        .reply(statusCode, response, headers)
        .persist()
    )
  }

  getMock():nock.Scope {
    if (this.nock) {
      return this.nock
    } else {
      throw new Error('Nock not instantiated, run this.before() first')
    }
  }

  setMock(nock: nock.Scope): nock.Scope {
    return (this.nock = nock)
  }
}

export default class ReleaseWorld extends GithubWorld {
  private query:Query | false = false
  releases: Releases | false = false
  private inputs?:Inputs
  result: any

  setQuery(query:Query):Query {
    return (this.query = Object.assign(
      this.query || {},
      query
    ))
  }

  setInputs(inputs: Inputs):Inputs {
    this.inputs = Object.assign({}, inputs)

    return Object.assign({}, this.inputs)
  }

  getInputs(): Inputs | false {
    return this.inputs ? Object.assign({}, this.inputs) : false
  }

  getQuery():Query | false {
    return this.query
  }

  setReleases(data: Releases): Releases {
    this.releases = data
    this.attach(JSON.stringify(this.releases), 'application/json')
    this.mockRequest('get', `/repos/${this.owner}/${this.repo}/releases`, 200, data)
    return data
  }
}
