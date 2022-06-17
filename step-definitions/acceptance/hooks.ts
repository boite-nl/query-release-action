/* eslint-disable no-invalid-this */
/* eslint-disable new-cap */

import { setWorldConstructor, Before, After } from '@cucumber/cucumber'
import GithubWorld from './world'

setWorldConstructor(GithubWorld)

Before(function() {
  // Setup GithubWorld
  this.before()
})

After(function() {
  this.after()
})
