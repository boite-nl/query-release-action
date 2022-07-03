/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable new-cap */

import { Then } from '@cucumber/cucumber'
import ReleaseWorld from './world';

import assert from 'node:assert'

Then('I expect to find releases matching the inputs', async function(this: ReleaseWorld) {
  assert.ok(this.result instanceof Array, 'Expected Array of Results')
  assert.ok(this.result.length > 0, 'Expected one or more results')

  if (this.releases) {
    assert.ok(this.result.length < this.releases.length, 'Expected a subset of all releases')
  } else {
    return 'pending'
  }
});

const objectMatch = (actual, compare): boolean => {
  return Object.keys(compare).reduce(
    (result: boolean, key: string): boolean => {
      if (result && actual[key] !== compare[key]) {
        result = false
      }
      return result
    },
    true
  )
}

Then('I expect to find the {string} release with:', function(this: ReleaseWorld, description, matchData) {
  const match = JSON.parse(matchData)

  this.log(description)
  this.attach(JSON.stringify(this.result), 'application/json')

  assert.ok(objectMatch(this.result, match), `No match for ${description}`)
})
