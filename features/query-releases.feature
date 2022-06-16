Feature: Query for Releases
  In order to find s specific release
  As a Automation Engineer
  I want to be able to query the Github Releases

  Background:
    Given the Github token has access to the Repository owned by the Owner
    And there are releases for the repository

  Scenario Outline: Query Releases based on Inputs
    Given the query inputs:
      | draft      | <draft>      |
      | prerelease | <prerelease> |
      | range      | <range>      |
      | release    | <release>    |
    When I search for releases
    Then I expect to find releases matching the inputs

    Examples:
      | draft | prerelease | range | release |
      | true  | false      | false | true    |
      | true  | true       | false | false   |
      | false | false      | false | true    |
      | false | true       | false | false   |
      | true  | true       | v2.X  | false   |
      | false | false      | v1.X  | true    |
