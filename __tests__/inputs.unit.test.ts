import * as process from 'process'
import Input from '../src/input'

// shows how the runner will run a javascript action with env / stdout protocol
describe('inputs unit tests', () => {
  beforeAll(() => {
    process.env['INPUT_NAME'] = 'action'
    process.env['GITHUB_WORKSPACE'] = __dirname
  })

  afterAll(() => {
    delete process.env['INPUT_NAME']
    delete process.env['GITHUB_WORKSPACE']
  })

  test('should validate inputs', () => {
    const inputs = new Input().inputs
    const actual = inputs.name.value
    expect(actual).toBeDefined()
    expect(actual).toStrictEqual('action')
  })
})
