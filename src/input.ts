import * as core from '@actions/core'

interface Inputs {
  name: Variable
}

interface Variable {
  key: string
  value: string
}

class Input {
  constructor() {}

  inputs: Inputs = {
    name: Input.get('name')
  }
  private static get(input: string): Variable {
    const fromInput = core.getInput(input)
    return {key: input, value: fromInput}
  }
}

export default Input
