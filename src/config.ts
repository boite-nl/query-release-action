import {from} from 'env-var'
import * as core from '@actions/core'

import { asRepoWithoutOwner} from './utils'

// const githubEvents = ['workflow_dispatch']

const env = from(process.env, {
  asRepoWithoutOwner
})

export interface Config {
  repo: string
  owner: string
  apiUrl: string
  token: string
}

const config: Config = {
  repo: env.get('GITHUB_REPOSITORY').required().asRepoWithoutOwner(),
  owner: env
    .get('GITHUB_REPOSITORY_OWNER')
    .required()
    .example('github')
    .asString(),
  apiUrl: env
    .get('GITHUB_API_URL')
    .default('https://api.github.com')
    .asString(),
  token: env
    .get('GITHUB_TOKEN')
    .required()
    .default(core.getInput('token'))
    .asString()
}

export default config
