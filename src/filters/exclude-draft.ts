
import { Release, Releases } from '../github/get-releases';
import { isDraft } from './draft';

export const isNotDraft = (release: Release): boolean => {
  return !isDraft(release)
}

export default function filterExcludeDraftReleases(releases: Releases) {
  return releases.filter(isNotDraft)
}
