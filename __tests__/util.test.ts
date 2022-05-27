import * as utils from '../src/utils'
import path from 'path';

describe('utils: test suite', () => {

  test.each([
    ['github/super-octokat', 'super-octokat'],
    ['github/.github', '.github']
  ])('should sanitize repo with given %p and result message %p', (input, expected) => {
    const actual = utils.asRepoWithoutOwner(input)
    expect(actual).toEqual(expected)
  })

  test.each([
    ['github_super-octokat', 'Repository github_super-octokat is not valid'],
    ['github/super/octokat', 'Repository github/super/octokat is not valid'],
    ['/super-octokat', 'Repository /super-octokat is not valid'],
    ['octokat/', 'Repository octokat/ is not valid']
  ])('should error when given %p and result message %p', (input, expected) => {
    expect(() => {
      utils.asRepoWithoutOwner(input)
    }).toThrow(expected)
  })

  test.each([
    ['refs/pull/2351235etgsdtg', 'refs/pull/2351235etgsdtg'],
    ['refs/heads/main', 'refs/heads/main'],
    ['refs/tags/v1.2.45', 'refs/tags/v1.2.45']
  ])('should sanitize github ref with given ref %p and result ref %p', (input, expected) => {
    const actual = utils.asGitHubRef(input)
    expect(actual).toEqual(expected)
  })

  test.each([
    ['', 'GITHUB_REF not set'],
    ['refs/unknown/2351235etgsdtg', 'must be a valid github ref'],
  ])('should error when "github ref" not provided', (input, expected) => {
    expect(() => {
      utils.asGitHubRef(input)
    }).toThrow(expected)
  })

  test.each([
    ['cool.yaml', true],
    ['some-other.valid.yml', true],
    ['dummy.json', false],
    ['example.md', false],
    ['index.html', false],
  ])('should validate "yaml" file', (input, expected) => {
    const actual = utils.isYmlFilename(input)
    expect(actual).toBe(expected)
  })

  it('should return all the files in directory', () => {
    const actual = utils.listFiles(__dirname)
    expect(actual).toContain(
      path.join(`${__dirname}/config.unit.test.ts`)
    )
  })

  it('should read file content', () => {
    const actual = utils.readFileContent(`${__dirname}/fixtures/example.yml`)
    expect(actual).toContain('value:')
  })
})
