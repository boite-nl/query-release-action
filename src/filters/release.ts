import { Release, Releases } from '../github/get-releases'
import { isPrerelease } from './prerelease'

export function isRelease(release: Release) {
  return !isPrerelease(release)
}

export default function filterReleases(releases: Releases): Releases {
  return releases.filter(isRelease)
}
