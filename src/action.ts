import inputs from './input'
import config from './config'
import {debug, setFailed, setOutput, warning} from '@actions/core'
import execute, {Configuration} from './index'
import {Release} from './github/get-releases'

const run = async () => {
  try {
    const runConfig: Configuration = Object.assign(
      {},
      {repo: config.repo, owner: config.owner, token: config.token},
      {retrieveAllReleases: inputs.retrieveAllReleases || false}
    )
    return await execute(runConfig, inputs)
  } catch (e) {
    throw e
  }
}

debug(new Date().toTimeString())

run()
  .then((release: Release | false) => {
    if (release) {
      setOutput('id', release.id)
      setOutput('name', release.name)
      setOutput('tag_name', release.tag_name)
      setOutput('body', release.body)
      setOutput('url', release.url)
    } else {
      warning('No Release Found')
    }

    debug(new Date().toTimeString())
  })
  .catch(error => {
    setFailed(error.message)
    debug(new Date().toTimeString())
  })
