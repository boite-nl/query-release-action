import * as core from '@actions/core'
import valid from 'semver/functions/valid'
import clean from 'semver/functions/clean'
import {availableSelectionMethods, SelectRelease} from './select-release'
import {isEmptyString, isFalse, toBoolean} from './utils'

export interface Inputs {
  draft: boolean
  excludeDraft: boolean
  prerelease: boolean
  range: string | false
  release: boolean
  select: SelectRelease | false
  retrieveAllReleases: boolean
}

type InputTransform = {
  // eslint-disable-next-line no-unused-vars
  [Property in keyof Inputs]: (value: string) => Inputs[Property]
}

function isVersion (value: string) {
  return valid(clean(value))
}

function getSelectTypeVersion(value:string) {
  return (isVersion(value) && clean(value) as SelectRelease) || false
}

function getSelectType(value: string) {
  const cleanupValue = value.toLowerCase().trim()

  return availableSelectionMethods.indexOf(cleanupValue)  === -1 ? false : cleanupValue as SelectRelease
}

function toSelectTypes(value: string): SelectRelease | false {
  return getSelectType(value) || getSelectTypeVersion(value)
}

export const transformers: InputTransform = {
  draft: toBoolean,
  excludeDraft: (value) =>
    typeof value !== 'undefined' && isFalse(value) ? false : true,
  prerelease: toBoolean,
  range: (value) =>
    (!isEmptyString(value) && !isFalse(value) && value.trim()) || false,
  release: toBoolean,
  select: toSelectTypes,
  retrieveAllReleases: toBoolean
}

export function transformInputs(
  inputs: Partial<Record<keyof InputTransform, string>>
): Inputs {
  return Object.keys(transformers).reduce(
    (set, key: string) =>
      Object.assign(set, {
        [key]: transformers[key](inputs[key] || '')
      }),
    {}
  ) as Inputs
}

const inputs: Readonly<Inputs> = transformInputs({
  draft: core.getInput('draft'),
  excludeDraft: core.getInput('exclude-draft'),
  prerelease: core.getInput('prerelease'),
  range: core.getInput('range'),
  release: core.getInput('release'),
  select: core.getInput('select'),
  retrieveAllReleases: core.getInput('retrieveAllReleases')
})

export default inputs
