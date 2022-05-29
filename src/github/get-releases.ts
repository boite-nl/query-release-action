import { Endpoints } from '@octokit/types'
import { Octokit } from '../octo'

type releasesParameters = Endpoints['GET /repos/{owner}/{repo}/releases']['parameters']
type releasesResponse = Endpoints['GET /repos/{owner}/{repo}/releases']['response']

export type Releases = releasesResponse['data']

async function getReleases(octokit: Octokit, inputs: releasesParameters): Promise<Releases> {
  const { data: releases } = await octokit.rest.releases.get(inputs)

  return releases
}

export default getReleases
