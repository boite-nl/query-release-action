/* eslint-disable no-unused-vars */
/* eslint-disable no-invalid-this */
/* eslint-disable new-cap */

import { Given } from '@cucumber/cucumber'
import ReleaseWorld from './world'
import releases from './fixtures/releases.json'
import { transformInputs } from '../../src/input'

Given('there are releases for the repository', async function (this: ReleaseWorld) {
  return this.setReleases(releases)
});

Given('the Github token has access to the Repository owned by the Owner', async function (this: ReleaseWorld) {
  const {token, repo, owner } = this
  if (token && repo && owner) {
    return token
  } else {
    throw new Error('Token, Repo or Owner are not available')
  }
});
// Given the filter inputs: {"draft": "<draft>", "prerelease": "<prerelease>", "range": "<range>", "release": "<release>"}
Given('the query inputs:', async function(this: ReleaseWorld, dataTable) {
  return this.setInputs(transformInputs(dataTable.rowsHash()))
})
