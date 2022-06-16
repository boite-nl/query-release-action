Feature: Select a Queried Release
  In order to find s specific release
  As a Automation Engineer
  I want to be able to select a Github Releases

  Background:
    Given the Github token has access to the Repository owned by the Owner
    And there are releases for the repository

  Scenario Outline: Query Releases based on Inputs
    Given the query inputs:
      | draft      | <draft>      |
      | prerelease | <prerelease> |
      | range      | <range>      |
      | release    | <release>    |
      | select     | <select>     |
    When I execute the script
    Then I expect to find the "<description>" release with:
      """
      <matchData>
      """

    Examples:
      | draft | prerelease | range | release | select   | description                 | matchData                              |
      | true  | false      | false | false   | latest   | Latest Draft                | {"draft": true}                        |
      | false | false      | false | true    | latest   | Latest Release              | {"draft": false, "prerelease": false}  |
      | false | false      | false | true    | previous | Previous Version            | {"draft": false, "prerelease": false}  |
      | false | true       | false | false   | v2.0.1   | Specific prerelease Version | {"prerelease": true, "name": "v2.0.1"} |
