import { Endpoints } from '@octokit/types'
import { Octokit } from '../octo'
import get from 'lodash.get'

type releasesParameters = Endpoints['GET /repos/{owner}/{repo}/releases']['parameters']
type releasesResponse = Endpoints['GET /repos/{owner}/{repo}/releases']['response']

export type Releases = releasesResponse['data']
export type Release = Releases[0]

const defaultInputs: Partial<releasesParameters> = {
  per_page: 100
}

async function getReleases(octokit: Octokit, inputs: releasesParameters, retrieveAllReleases?: boolean): Promise<Releases> {
  return get(
    retrieveAllReleases ?
      await octokit.paginate(
        octokit.rest.repos.listReleases,
        Object.assign({}, defaultInputs, inputs)
      ) :
      await octokit.rest.repos.listReleases(Object.assign({}, defaultInputs, inputs)),
    'data'
  )
}

export default getReleases
