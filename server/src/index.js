;(function () {
  const result = require('dotenv').config()
  if (result.error) {
    throw result.error
  }
})()

const Octokit = require('@octokit/rest')
const express = require('express')
const app = express()

const MAX_RESULTS = 20
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
    const message =
      error.status === 404 ? 'Organization not found' : error.name || ''
    return void res.status(error.status || 500).send({ error: message })
  }

  res.send(reposToBasicStats(githubResponse.data))
})

app.get('/orgs/:org/contributors', async (req, res) => {
  const { org } = req.params
  let repoContributors

  try {
    const githubResponse = await octokit.repos.listForOrg({ org })

    repoContributors = await Promise.all(
      githubResponse.data.map(repo => getContributors(org, repo.name))
    )
  } catch (error) {
    const message =
      error.status === 404 ? 'Organization not found' : error.name || ''
    return void res.status(error.status || 500).send({ error: message })
  }

  res.send(formatContributors(repoContributors))
})

app.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`Listening on port ${port}`)
})

async function getContributors (owner, repo) {
  const { data } = await octokit.repos.listContributors({
    owner,
    repo
  })
  return { name: repo, count: data.length }
}

function formatContributors (repoContributorsPairs) {
  const byContributors = repoContributorsPairs
    .sort(compareCount)
    .slice(0, MAX_RESULTS)

  return byContributors
}

function reposToBasicStats (repos) {
  const stats = {
    byForks: repos
      .map(repo => ({ name: repo.name, count: repo.stargazers_count }))
      .sort(compareCount)
      .slice(0, MAX_RESULTS),
    byStars: repos
      .map(repo => ({ name: repo.name, count: repo.forks_count }))
      .sort(compareCount)
      .slice(0, MAX_RESULTS)
  }

  return stats
}

function compareCount (a, b) {
  return b.count - a.count
}
