/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */

import { When } from '@cucumber/cucumber'
import execute, { search } from '../../src'
import ReleaseWorld from './world'

When('I search for releases', async function(this: ReleaseWorld) {
  const { repo, owner, token } = this
  const inputs = this.getInputs()

  if (inputs) {
    const result = await search({ repo, owner, token }, inputs)

    return (this.result = result)
  } else {
    throw new Error('No Inputs set for search')
  }
})

When('I execute the script', async function(this: ReleaseWorld) {
  const { repo, owner, token } = this
  const inputs = this.getInputs()

  if (inputs) {
    const result = await execute({ repo, owner, token }, inputs)

    return (this.result = result)
  } else {
    throw new Error('No Inputs set for search')
  }
})
