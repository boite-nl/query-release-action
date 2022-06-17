import semverCompare from 'semver/functions/compare'
import semverRCompare from 'semver/functions/rcompare'
import orderBy from 'lodash.orderby'
import omit from 'lodash.omit'
import {Releases, Release} from './github/get-releases'
import valid from 'semver/functions/valid'
import clean from 'semver/functions/clean'
import equal from 'semver/functions/eq'

const semverSort = {
  asc: semverCompare,
  desc: semverRCompare
}

type OrderByDirection = 'asc' | 'desc'

function ensureOrderDateForRelease(
  release: Release
): Release & {orderBy: Date} {
  return Object.assign({}, release, {
    orderBy: release.published_at
      ? new Date(release.published_at)
      : new Date(release.created_at)
  })
}

function sortByDate(releases: Releases, direction: OrderByDirection): Releases {
  return orderBy(
    releases.map(ensureOrderDateForRelease),
    ['orderBy'],
    [direction]
  ).map(release => omit(release, 'orderBy'))
}

function sortBySemver(releases, direction: OrderByDirection): Releases {
  return releases.sort((a, b) => semverSort[direction](a.name, b.name, true))
}

const selectionMethods = {
  latest: function latestRelease(releases: Releases): Release | false {
    const sortedReleases = sortByDate(releases, 'desc')

    return sortedReleases.length > 0 ? sortedReleases[0] : false
  },
  previous: function previousRelease(releases: Releases): Release | false {
    const sortedReleases = sortByDate(releases, 'desc')

    return sortedReleases.length > 0 ? sortedReleases[1] : false
  },
  max: function maxRelease(releases: Releases): Release | false {
    const sortedReleases = sortBySemver(releases, 'desc')

    return sortedReleases.length > 0 ? sortedReleases[0] : false
  },
  min: function minRelease(releases: Releases): Release | false {
    const sortedReleases = sortBySemver(releases, 'asc')

    return sortedReleases.length > 0 ? sortedReleases[0] : false
  }
}

function compareVersionToRelease(
  {name, tag_name: tagName}: Pick<Release, 'name' | 'tag_name'>,
  version
): boolean {
  return (
    (name && equal(version, name)) ||
    (tagName && equal(version, tagName)) ||
    false
  )
}

function findVersion(releases: Releases, version: string): Release | false {
  return (
    releases.find(release => compareVersionToRelease(release, version)) || false
  )
}

function selectVersion(releases: Releases, version: string): Release | false {
  if (valid(clean(version))) {
    return findVersion(releases, version)
  } else {
    return false
  }
}

export type SelectRelease = keyof typeof selectionMethods
export const availableSelectionMethods = Object.keys(selectionMethods)

export default function selectRelease(
  releases: Releases,
  select: SelectRelease
): Release | false {
  return (
    selectVersion(releases, select) ||
    (selectionMethods[select] && selectionMethods[select](releases)) ||
    false
  )
}
