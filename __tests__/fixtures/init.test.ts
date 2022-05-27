// @ts-ignore
import path from 'path';

export function initTestEnv() {
  process.env.GITHUB_WORKSPACE = path.join(__dirname, '../../');
  process.env.GITHUB_REPOSITORY = 'github/octocat';
  process.env.GITHUB_REPOSITORY_OWNER = 'accelerator-blueprints'
  process.env.GITHUB_REF = 'refs/heads/main';
  process.env.GITHUB_WORKFLOW = 'test_workflow';
  process.env.GITHUB_EVENT_NAME = 'workflow_dispatch'
  process.env.GITHUB_ACTION = 'readable-readme';
  process.env.GITHUB_SHA = '6a3f7b3a12384';
  process.env.GITHUB_TOKEN = 'super-secret-github-token';
  process.env.TEST_GITHUB_TOKEN = 'test_token';
}

export function cleanTestEnv() {
  delete process.env.GITHUB_WORKSPACE
  delete process.env.GITHUB_REPOSITORY
  delete process.env.GITHUB_REPOSITORY_OWNER
  delete process.env.GITHUB_REF
  delete process.env.GITHUB_WORKFLOW
  delete process.env.GITHUB_EVENT_NAME
  delete process.env.GITHUB_ACTION
  delete process.env.GITHUB_SHA
  delete process.env.GITHUB_TOKEN
  delete process.env.TEST_GITHUB_TOKEN
}

describe('should not encounter paradox', () => {
  it('init clean no crash', () => {
    expect(() => {
      initTestEnv();
      cleanTestEnv();
    }).not.toThrow();
  });
});
