import {debug, setFailed, setOutput, info} from '@actions/core'
import {inspect} from 'util'

import Input from './input'

export const run = async () => {
  const inputs = new Input().inputs
  info(`Inputs: ${inspect(inputs)}`)

  debug(new Date().toTimeString())
  await execute(10)
  debug(new Date().toTimeString())

  setOutput('gh_output', new Date().toTimeString())
}

export const execute = (milliseconds: number) => {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), milliseconds))
}

run()
  .then(() => {})
  .catch((error) => {
    setFailed(error.message)
  })
