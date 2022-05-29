import {getOctokit} from '@actions/github'
import {GitHub} from '@actions/github/lib/utils'

export type Octokit = InstanceType<typeof GitHub>

export function client(token: string): Octokit {
  return getOctokit(token);
}
