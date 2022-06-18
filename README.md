# Query Github Releases Action

Github Action to Query Github releases and retrieve information about this release which can be used in other actions.

## Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Action](#action)
  - [Inputs](#inputs)
  - [Environment Variables](#environment-variables)
  - [Outputs](#outputs)
  - [Runs](#runs)
- [Examples](#examples)
  - [Deploy specific release to environment](#deploy-specific-release-to-environment)
  - [Rollback action](#rollback-action)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Action
<!-- action-docs-inputs -->
### Inputs

| parameter | description | required | default |
| - | - | - | - |
| token | Token for the repository. Can be passed in using `{{ secrets.GITHUB_TOKEN }}`. | `false` | ${{ github.token }} |
| draft | Get Draft Release | `false` | false |
| exclude-draft | Exclude Draft Releases | `false` |  |
| prerelease | Get Prerelease | `false` | false |
| range | Get Semver Versions from within a specific Range | `false` |  |
| release | Get Release | `false` | false |
| select | Which release do you want to retrieve? (latest, previous, oldest, max, min, specific release) | `false` | latest |



<!-- action-docs-inputs -->

### Environment Variables

<!-- action-docs-outputs -->
### Outputs

| parameter | description |
| - | - |
| found | A release is found |
| id | The Release ID |
| name | The name for the release |
| tag_name | The tag name for the release |
| body | Description of the Release |
| url | The URL of the Release |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
### Runs

This action is a `node16` action.


<!-- action-docs-runs -->

## Examples

### Deploy specific release to environment
```yml
on:
  workflow_dispatch:
    inputs:
      version:
        description: The version to release
        default: previous
        required: false
        type: string
      environment:
        description: The environment to which to release
        defualt: production
        required: false
        type: string

jobs:
  deploy-release:
    runs-on: ubuntu-latest

    steps:
      - name: Get Release
        uses: query-github-release@v1
        id: get-release
        with:
          release: true
          select: ${{ inputs.version }}
      - uses: actions/checkout@v3
        if: steps.get-release.outputs.tag_name
        with:
          fetch-depth: 1
          ref: refs/tags/${{ steps.get-release.outputs.tag_name }}
      - name: "Deploy to environment: ${{ inputs.environment }}"
        run: |
          Deploying ${{ steps.get-release.outputs.tag_name }} to environment: ${{ inputs.environment }}
```

### Rollback action

```yml
on:
  workflow_dispatch:
    inputs:
      version:
        description: The version to rollback to
        default: previous
        required: false
        type: string

jobs:
  rollback:
    runs-on: ubuntu-latest

    steps:
      - name: Get Release to Rollback to
        uses: query-github-release@v1
        id: get-release
        with:
          release: true
          select: ${{ inputs.version }}
      - name: Rollback action
        if: steps.get-release.outputs.tag_name
        run: |
          echo "Rolling back to: ${{ steps.get-release.outputs.tag_name }}"
```
