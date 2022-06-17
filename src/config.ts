import {from} from 'env-var'
import * as core from '@actions/core'

import {asGitHubRef, asRepoWithoutOwner} from './utils'

// const githubEvents = ['workflow_dispatch']

const env = from(process.env, {
  asRepoWithoutOwner,
  asGitHubRef
})

export interface Config {
  workspace: string
  repo: string
  owner: string
  ref: string
  sha: string
  apiUrl: string
  serverUrl: string
  event: string
  token: string
}

const config: Config = {
  workspace: env.get('GITHUB_WORKSPACE').required().example('src').asString(),
  repo: env.get('GITHUB_REPOSITORY').required().asRepoWithoutOwner(),
  owner: env
    .get('GITHUB_REPOSITORY_OWNER')
    .required()
    .example('github')
    .asString(),
  ref: env.get('GITHUB_REF').required().asGitHubRef(),
  sha: env.get('GITHUB_SHA').required().asString(),
  apiUrl: env
    .get('GITHUB_API_URL')
    .default('https://api.github.com')
    .asString(),
  serverUrl: env
    .get('GITHUB_SERVER_URL')
    .default('https://github.com')
    .asString(),
  event: env.get('GITHUB_EVENT_NAME').required().asString(),
  token: env
    .get('GITHUB_TOKEN')
    .required()
    .default(core.getInput('token'))
    .asString()
}

export default config
