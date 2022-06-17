import satisfies from 'semver/functions/satisfies';
import valid from 'semver/functions/valid';
import { Releases } from '../github/get-releases';

export type SemverRange = string

function versionIsWithinRange({ name, tag_name: tagName }, range) {
  return (name && valid(name) && satisfies(name, range, true)) ||
    (valid(tagName) && satisfies(tagName, range, true)) ||
    false
}

export default function filterReleasesInRange(releases: Releases, range: SemverRange): Releases {
  return releases.filter((release) => versionIsWithinRange(release, range))
}
