import {Inputs} from './input'
import {Config} from './config'

import {client, Octokit} from './octo'
import getReleases, {Release, Releases} from './github/get-releases'
import filter from './filters'
import selectRelease from './select-release'

export type Configuration = Pick<Config, 'repo' | 'owner' | 'token'> &
  Partial<Pick<Inputs, 'retrieveAllReleases'>>
export type Query = Partial<Omit<Inputs, 'retrieveAllReleases'>>

export async function search(
  {repo, owner, token, retrieveAllReleases}: Configuration,
  query: Query
): Promise<Releases> {
  const octo: Octokit = client(token)

  const releases = await getReleases(octo, {owner, repo}, retrieveAllReleases)

  return filter(releases, query)
}

export default async function execute(
  config: Configuration,
  query: Query
): Promise<Release | false> {
  const releases = await search(config, query)

  return selectRelease(releases, query.select || 'latest') || false
}
