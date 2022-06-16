import { Query } from '../index'
import { Releases } from '../github/get-releases'
import filterDraftreleases from './draft'
import filterExcludeDraftReleases from './exclude-draft'
import filterPrereleases from './prerelease'
import filterReleasesInRange from './range'
import filterReleases from './release'
import omit from 'lodash.omit'

type QueryToFilters = Partial<Record<keyof Query, (_releases: Releases, _options?: any) => Releases>>
type OrderOfFilters = Array<keyof Query>

const queryToFilters: QueryToFilters = {
  draft: filterDraftreleases,
  excludeDraft: filterExcludeDraftReleases,
  prerelease: filterPrereleases,
  release: filterReleases,
  range: filterReleasesInRange
}

const orderOfFilters: OrderOfFilters = ['range', 'draft', 'excludeDraft', 'prerelease', 'release']

const excludeOtherFilters: Partial<Record<keyof Query, Array<keyof Query>>> = {
  draft: ['excludeDraft'],
  prerelease: ['release'],
  release: ['prerelease']
}

function getExcludedFiltersForQuery(query, filter): Array<keyof Query> | false {
  return (query[filter] && excludeOtherFilters[filter]) || false
}

function omitCurrentFilter(query, filter): Array<keyof Query> | false {
  return (!query[filter] && [filter]) || false
}

function getFiltersToBeOmitted(query, filter): Array<keyof Query> | false {
  return getExcludedFiltersForQuery(query, filter) ||
    omitCurrentFilter(query, filter) ||
    false
}

function buildQuery(query:Query): Partial<Query> {
  const applicableQuery = orderOfFilters.reduce(
    (query, filter) => {
      const omitFilters = query[filter] ? getFiltersToBeOmitted(query, filter) : false

      return omitFilters ? omit(query, omitFilters) : query
    },
    query
  )

  return applicableQuery
}

function applyFilterOnReleases (releases: Releases, filter: string, query: Partial<Query>): Releases {
  const apply = query[filter] && queryToFilters[filter] instanceof Function && queryToFilters[filter]

  return apply ?
    apply(releases, query[filter]) :
    releases
}

function applyQuery(releases:Releases, query: Partial<Query>): Releases {
  return orderOfFilters.reduce(
    (releases, filter) => applyFilterOnReleases(releases, filter, query),
    releases
  )
}

export default function filter(releases: Releases, query: Query): Releases {
  return applyQuery(releases, buildQuery(query))
}
