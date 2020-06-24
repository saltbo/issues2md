// const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const dist = core.getInput('dist');
    core.debug(`ISSUES_DIST = '${dist}'`);

    // GitHub workspace
    let githubWorkspacePath = process.env['GITHUB_WORKSPACE']
    if (!githubWorkspacePath) {
      throw new Error('GITHUB_WORKSPACE not defined')
    }
    githubWorkspacePath = path.resolve(githubWorkspacePath)
    core.debug(`GITHUB_WORKSPACE = '${githubWorkspacePath}'`)

    const ghToken = core.getInput('ghToken');
    console.log(ghToken)
    const octokit = github.getOctokit(ghToken);
    const { data: issues } = await octokit.issues.listForRepo({
      owner: 'saltbo',
      repo: 'blog',
    });
    console.log(issues)
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
