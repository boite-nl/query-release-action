# Query Github Releases Action

<!-- action-docs-description -->
### Description

Query Github Releases

<!-- action-docs-description -->


<!-- START doctoc -->
<!-- END doctoc -->

## Action
<!-- action-docs-inputs -->
### Inputs

| parameter     | description                                                                                   | required | default             |
| ------------- | --------------------------------------------------------------------------------------------- | -------- | ------------------- |
| token         | Token for the repository. Can be passed in using `{{ secrets.GITHUB_TOKEN }}`.                | `false`  | ${{ github.token }} |
| select        | Which release do you want to retrieve? (latest, previous, oldest, max, min, specific release) | `false`  | latest              |
| prerelease    | Get Prerelease                                                                                | `false`  | false               |
| draft         | Get Draft Release                                                                             | `false`  | false               |
| exclude-draft | Exclude Draft Releases                                                                        | `false`  |                     |
| range         | Get Semver Versions from within a specific Range                                              | `false`  |                     |



<!-- action-docs-inputs -->

### Environment Variables

<!-- action-docs-outputs -->
### Outputs

| parameter | description                  |
| --------- | ---------------------------- |
| id        | The Release ID               |
| name      | The name for the release     |
| tag_name  | The tag name for the release |
| body      | Description of the Release   |
| url       | The URL of the Release       |



<!-- action-docs-outputs -->

<!-- action-docs-runs -->
### Runs

This action is a `node16` action.


<!-- action-docs-runs -->
