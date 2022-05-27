import {ExtensionFn} from 'env-var'
import * as fs from 'fs'
import * as file from 'filewtf'

/**
 * This function parses the GitHub repo owner from the repo name
  * @param value the GitHub repo name
 */
export const asRepoWithoutOwner: ExtensionFn<string> = ((value) => {
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
})

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
 * This function get the current repo reference from
 * the environment variables.
 */
export const asGitHubRef: ExtensionFn<string> = (ref: string) => {
  if (!ref) {
    throw new Error('GITHUB_REF not set')
  } else {
    if (isBranchRef(ref)) {
      return ref
    } else if (isPullRequestRef(ref)) {
      return ref
    } else if (isTagRef(ref)) {
      return ref
    } else {
      throw new Error('must be a valid github ref')
    }
  }
}

/**
 * This function checks if a GitHub reference is
 * referring to a branch.
 */
const isBranchRef = (ref: string) => {
  const matcher = new RegExp('^refs/heads/')
  return matcher.test(ref)
}

/**
 * This function checks if a GiHub reference is
 * referring to a pull request.
 */
const isPullRequestRef= (ref: string) => {
  const matcher = new RegExp('^refs/pull/[0-9]+');
  return matcher.test(ref);
}

/**
 * This function validates if a GitHub reference is
 * a tag.
 * @param ref The GitHub reference to be validated
 */
const isTagRef = (ref) => {
  const matcher = new RegExp('^refs/tags/');
  return matcher.test(ref);
}

/**
 * This function lists all the items in the
 * target root directory recurrsively.
 * @param rootDir the root directory to be walked
 */
export const listFiles = (rootDir: string) => {
  return file.walkthrough(rootDir);
}

/**
 * This function reads the content of a file.
 * @param filename the filename of the file to be read
 */
export const readFileContent = (filename: string) => {
  return fs.readFileSync(filename, 'utf8');
}

/**
 * This function checks if a filename is a yaml.
 * @param filename the filename that needs to be checked
 */
export const isYmlFilename = (filename: string) => {
  const matcher = new RegExp('^.*\.(yml|yaml)$');
  return matcher.test(filename);
}
