import { isTrue } from '../utils';
import { Release, Releases } from '../github/get-releases';

export function isPrerelease({ prerelease }: Release): boolean {
  return isTrue(prerelease)
}

export default function filterPrereleases(releases: Releases): Releases {
  return releases.filter(isPrerelease)
}
