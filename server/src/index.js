;(function () {
  const result = require('dotenv').config()
  if (result.error) {
    throw result.error
  }
})()

const Octokit = require('@octokit/rest')
const express = require('express')
const app = express()

const port = process.env.PORT
const githubToken = process.env.GITHUB_API_TOKEN

const octokit = Octokit({
  auth: githubToken
})

app.get('/orgs/:org/basic-stats', async (req, res) => {
  const { org } = req.params
  let githubResponse

  try {
    githubResponse = await octokit.repos.listForOrg({ org })
  } catch (error) {
    return void res
      .status(error.status || 500)
      .send({ error: `GitHub API ${error.name || ''}` })
  }

  res.send(reposToBasicStats(githubResponse.data))
})

app.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`Listening on port ${port}`)
})

function reposToBasicStats (repos) {
  const stats = {
    stars: 0,
    forks: 0,
    repos: repos.length
  }

  repos.forEach(({ fork, forks_count, stargazers_count }) => {
    if (!fork) {
      stats.forks += forks_count
      stats.stars += stargazers_count
    }
  })

  return stats
}
