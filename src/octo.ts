import {getOctokit} from '@actions/github'

export function client(token: string) {
  return getOctokit(token);
}
