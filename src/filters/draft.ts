
import { isTrue } from '../utils';
import { Release, Releases } from '../github/get-releases';

export function isDraft({ draft }: Release): boolean {
  return isTrue(draft)
}

export default function filterDraftreleases(releases: Releases) {
  return releases.filter(isDraft)
}
