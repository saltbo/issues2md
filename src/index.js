const fs = require('fs');
const path = require('path');
const core = require('@actions/core');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try {
    let dist = core.getInput('dist');
    core.debug(`ISSUES_DIST = '${dist}'`);

    // GitHub workspace
    let githubWorkspacePath = process.env['GITHUB_WORKSPACE']
    if (!githubWorkspacePath) {
      throw new Error('GITHUB_WORKSPACE not defined')
    }
    githubWorkspacePath = path.resolve(githubWorkspacePath)
    core.debug(`GITHUB_WORKSPACE = '${githubWorkspacePath}'`)

    let issuesDir = path.join(githubWorkspacePath, dist); 
    if (!fs.existsSync(issuesDir)) {
      fs.mkdirSync(issuesDir)
    }

    const ghToken = core.getInput('ghToken');
    const octokit = github.getOctokit(ghToken);
    const { data: issues } = await octokit.issues.listForRepo({
      owner: 'saltbo',
      repo: 'blog',
      labels: ['DAQ'],
    });

    issues.forEach(ele => {
      let header = `---\ntitle: "${ele.title}"\nauthor: ${ele.user.login}\ndate: ${ele.created_at}\n---\n`
      let file = path.join(issuesDir, ele.number+'.md'); 
      fs.writeFile(file, header+ele.body, (err) => {
          if(err){
            throw err
          }

          core.info(`issue#${ele.number} -> ${file}`)
      });
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
