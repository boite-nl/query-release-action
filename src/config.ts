import {from} from 'env-var'
import * as core from '@actions/core'

import {asGitHubRef, asRepoWithoutOwner} from './utils'

const githubEvents = ['workflow_dispatch']

const env = from(process.env, {
  asRepoWithoutOwner,
  asGitHubRef
})

export class Config {
  constructor() {
  }

  workspace: string = env.get('GITHUB_WORKSPACE').required().example('src').asString()
  repo: string = env.get('GITHUB_REPOSITORY').required().asRepoWithoutOwner()
  owner: string = env.get('GITHUB_REPOSITORY_OWNER').required().example('github').asString()
  ref: string = env.get('GITHUB_REF').required().asGitHubRef()
  sha: string = env.get('GITHUB_SHA').required().asString()
  apiUrl: string = env.get('GITHUB_API_URL').default('https://api.github.com').asString()
  serverUrl: string = env.get('GITHUB_SERVER_URL').default('https://github.com').asString()
  event: string = env.get('GITHUB_EVENT_NAME').required().asEnum(githubEvents)
  token: string = env.get('GITHUB_TOKEN').required().default(core.getInput('token')).asString()
}
