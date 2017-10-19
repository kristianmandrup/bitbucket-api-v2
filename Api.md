# API

The following lists the methods available in the API.
This list of API methods might not (always) be complete, so please help maintain it.

## User

See [user API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/user)

- `get(callback)`
- `getEmails(callback)`
- `getEmailDetails(emailAddr, callback)`

## Users

See [users API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/users)

- `get(username, callback)`
- `getFollowers(username, callback)`
- `getFollowing(username, callback)`
- `getWebHooks(username, callback)`
- `getWebHook(username, hookId, callback)`
- `removeWebHook(username, hookId, callback)`
- `updateWebHook(username, hookId, hook, callback)`
- `getPipelineConfigVars(username, hookId, callback)`
- `getPipelineConfigVar(username, variable_uuid, callback)`
- `removePipelineConfigVar(username, variable_uuid, callback)`
- `updatePipelineConfigVar(username, variable_uuid, variable, callback)`
- `getRepositories(username, callback)`

## Repositories

Would be nice with a more "fluent" api so we can avoid having to use the form: `username, repoSlug` for each repository request

Would like to see:

```js
let project = repositories.forProject(username, repo)
await project.create()
await project.commit(commit)
```

`forProject` now has experimental support ;)

See [repositories API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories)

POST (create)

- `create(username, repo, callback)`

### On existing repositiory

See [repo slug API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Busername%7D/%7Brepo_slug%7D)

- `createPullRequest(username, repoSlug, pullRequest, callback)`

GET (retrieve)

- `get(username, repoSlug, callback)`
- `getBranches(username, repoSlug, callback)`
- `getCommit(username, repoSlug, sha, callback)`
- `getPullRequests(username, repoSlug, state, callback)`
- `getByUser(username, callback)`
- `getByTeam(teamname, callback)`
- `getForks(username, repoSlug, callback)`
- `getForksFromResponse(response, callback)`
- `getParentFromResponse(response, callback)`

POST (create)

- `commit(username, repoSlug, files, callback)`
- `commit(username, repoSlug, files, options, callback)`

### Commit

Approval:

- `approve(username, repoSlug, node, callback)`
- `disApprove(username, repoSlug, node, callback)`

Builds:

- `getBuildStatuses(username, repoSlug, node, callback)`
- `createNewBuild(username, repoSlug, node, callback)`
- `getBuildStatus(username, repoSlug, node, key, callback)`

Comments:

- `getComments(username, repoSlug, sha, callback)`
- `getComment(username, repoSlug, sha, commentId, callback)`

### Commits

- `getAll(username, repoSlug, callback)`

### Components

- `getAll(username, repoSlug, callback)`

### Issues

- `create(username, repoSlug, callback)`
- `getAll(username, repoSlug, callback)`
- `get(username, repoSlug, issue_id, callback)`
- `remove(username, repoSlug, issue_id, callback)`

Attachments:

- `getAttachments(username, repoSlug, issue_id, callback)`
- `getAttachment(username, repoSlug, issue_id, path, callback)`
- `uploadAttachments(username, repoSlug, issue_id, attachments, options, callback)`

Comments:

- `getComments(username, repoSlug, issue_id, callback)`
- `getComment(username, repoSlug, issue_id, commentId, callback)`

Voting:

- `hasVoted(username, repoSlug, issue_id, callback)`
- `vote(username, repoSlug, issue_id, callback)`
- `retractVote(username, repoSlug, issue_id, callback)`

Watchers:

- `isWatched(username, repoSlug, issue_id, callback)`
- `watch(username, repoSlug, issue_id, callback)`
- `stopWatch(username, repoSlug, issue_id, callback)`

### Milestones

- `getAll(username, repoSlug, callback)`
- `get(username, repoSlug, milestoneId, callback)`

### Pipelines

- `create(username, repoSlug, callback)`
- `getAll(username, repoSlug, callback)`
- `get(username, repoSlug, pipeline, callback)`
- `stop(username, repoSlug, pipeline, callback)`

Steps:

- `getSteps(username, repoSlug, pipeline, callback)`
- `getStep(username, repoSlug, pipeline, step, stepUuid, callback)`

### Pull requests

- `getAll(username, repoSlug, callback)`
- `create(username, repoSlug, pullRequest, callback)`

Activity:

- `allActivity(username, repoSlug, callback)`
- `getActivity(username, repoSlug, pr_id, callback)`

Approval:

- `approve(username, repoSlug, pr_id, callback)`
- `disApprove(username, repoSlug, pr_id, callback)`

Comments:

- `getComments(username, repoSlug, pr_id, callback)`
- `getComment(username, repoSlug, pr_id, comment_id, callback)`
- `getCommits(username, repoSlug, pr_id, callback)`

Misc:

- `decline(username, repoSlug, pr_id, callback)`
- `getDiff(username, repoSlug, pr_id, callback)`
- `merge(username, repoSlug, pr_id, callback)`
- `patch(username, repoSlug, pr_id, callback)`
- `statuses(username, repoSlug, pr_id, callback)`

### Refs

- `getAll(username, repoSlug, callback)`

### Hooks

- `getAll(username, repoSlug, callback)`
- `create(username, repoSlug, callback)`

### Versions

- `getAll(username, repoSlug, callback)`
- `get(username, repoSlug, version_id, callback)`

### Downloads

- `getAll(username, repoSlug, callback)`
- `upload(username, repoSlug, file, callback)`

### Pipelines Config

- `get(username, repoSlug, callback)`
- `update(username, repoSlug, config, callback)`

Schedules:

- `nextBuildNumber(username, repoSlug, number, callback)`
- `getSchedules(username, repoSlug, callback)`
- `createSchedule(username, repoSlug, schedule, callback)`
- `getSchedule(username, repoSlug, scheduleId, callback)`
- `getScheduleExecutions(username, repoSlug, scheduleId, callback)`
- `updateSchedule(username, repoSlug, scheduleId, callback)`
- `deleteSchedule(username, repoSlug, scheduleId, callback)`

### Forks

- `getAll(username, repoSlug, callback)`

### Branch Restrictions

- `get(username, repoSlug, callback)`
- `create(username, repoSlug, kind, callback)`
- `getRestriction(username, repoSlug, restrictionId, callback)`
- `updateRestriction(username, repoSlug, restrictionId, restriction, callback)`
- `removeRestriction(username, repoSlug, restrictionId, callback)`

## Teams

See [teams API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/teams)

- `get(role = 'member', callback)`
- `getProjects(owner, callback)`
- `addProject(owner, project, callback)`
- `getProject(owner, projectId, callback)`
- `updateProject(owner, projectId, project, callback)`
- `removeProject(owner, projectId, callback)`
- `getUserInfo(username, callback)`

## Hook events

See [hook events API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/hook_events)

- `get(callback)`
- `forSubject(subjectType, callback)`

## Snippets

See [snippets API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/snippets)

- `get(callback)`
- `create(files, callback)`
- `createWithMeta(data, callback)`

For specific user

- `getFor(username, callback)`
- `createSnippetFor(username, snippet, callback)`
- `getSnippetFor(username, snippetId, callback)`
- `updateSnippetFor(username, snippetId, snippet, callback)`
- `removeSnippetFor(username, snippetId, snippet, callback)`

Snippet comments

- `getSnippetCommentsFor(username, snippetId, callback)`
- `addSnippetCommentFor(username, snippetId, comment, callback)`
- `getSnippetCommitsFor(username, snippetId, callback)`

Snippet watchers

- `isSnippetWatchedFor(username, snippetId, callback)`
- `watchSnippetFor(username, snippetId, callback)`
- `stopWatchingSnippetFor(username, snippetId, callback)`
- `getSnippetWatchersFor(username, snippetId, callback)`

## Addon

See [addon API](https://developer.atlassian.com/bitbucket/api/2/reference/resource/addon)

- `remove(callback)`
- `update(addon, callback)`
