import {ExtensionFn} from 'env-var'
import * as fs from 'fs'
import * as file from 'filewtf'

/**
 * This function parses the GitHub repo owner from the repo name
 * @param value the GitHub repo name
 */
export const asRepoWithoutOwner: ExtensionFn<string> = value => {
  if (!validateGitHubRepo(value)) {
    throw new Error(`Repository ${value} is not valid`)
  }
  const split = String(value).split('/')
  // Validating email addresses is hard.
  if (split.length < 2) {
    throw new Error('must contain at least one "/"')
  }
  // return second value
  return split[1]
}

/**
 * This function validates if a GitHub repo from the environment
 * variable is valid.
 * @param value
 */
const validateGitHubRepo = (value: string) => {
  const matcher = new RegExp('^[^/]+/[^/]+$')
  return matcher.test(value)
}

/**
 * This function lists all the items in the
 * target root directory recurrsively.
 * @param rootDir the root directory to be walked
 */
export const listFiles = (rootDir: string) => {
  return file.walkthrough(rootDir)
}

/**
 * This function reads the content of a file.
 * @param filename the filename of the file to be read
 */
export const readFileContent = (filename: string) => {
  return fs.readFileSync(filename, 'utf8')
}

/**
 * This function checks if a filename is a yaml.
 * @param filename the filename that needs to be checked
 */
export const isYmlFilename = (filename: string) => {
  const matcher = new RegExp('^.*.(yml|yaml)$')
  return matcher.test(filename)
}

export const isEmptyString = (value: string): boolean => {
  return !value || value.trim().length === 0 || false
}

export function toBoolean(value: string): boolean {
  return typeof value === 'string'
    ? ['true', 'yes', '1'].indexOf(value.toLowerCase().trim()) === -1
      ? false
      : true
    : false
}

export const isTrue = (value: string | boolean | undefined | null) => {
  return (
    (typeof value === 'boolean' && value) ||
    (typeof value === 'string' && toBoolean(value)) ||
    false
  )
}

export const isFalse = (value: string | boolean | undefined | null) => {
  return (
    value === false ||
    (typeof value === 'string' &&
      ['false', 'no', '0'].indexOf(value.toLowerCase().trim()) !== -1) ||
    false
  )
}
