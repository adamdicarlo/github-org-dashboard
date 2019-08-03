import React, { useEffect, useState } from 'react';

// View model for error handling.
interface APIError {
  status?: number
  message?: string
}

// A map of repository name -> number of contributors.
type OrderedRepos = {
  name: string
  count: number
}[]

// View model and API response format.
interface BasicStats {
  byForks: OrderedRepos
  byStars: OrderedRepos
}

// API response format for errors.
interface ErrorResponse {
  error: string
}

interface Props {
  name: string
}

const OrgStats: React.FC<Props> = ({ name }) => {
  const [basicStats, setBasicStats] = useState<BasicStats | null>(null)
  const [mostContributors, setMostContributors] = useState<OrderedRepos | null>(null)
  const [error, setError] = useState<APIError | null>(null)

  useEffect(() => {
    (async (): Promise<void> => {
      let response
      try {
        const uriName = encodeURIComponent(name)
        response = await fetch(`/orgs/${uriName}/basic-stats`)
        if (response.status !== 200) {
          setError({ status: response.status })
          const e: ErrorResponse = await response.json()
          return setError({ status: response.status, message: e.error })
        }

        const incoming = await response.json()
        setBasicStats(incoming)
      } catch (err) {
        setError({ message: err.message })
      }
    })()
  }, [name])

  useEffect(() => {
    (async (): Promise<void> => {
      let response
      try {
        const uriName = encodeURIComponent(name)
        response = await fetch(`/orgs/${uriName}/contributors`)
        if (response.status !== 200) {
          setError({ status: response.status })
          const e: ErrorResponse = await response.json()
          return setError({ status: response.status, message: e.error })
        }

        const incoming = await response.json()
        setMostContributors(incoming)
      } catch (err) {
        setError({ message: err.message })
      }
    })()
  }, [name])

  if (error) {
    const { message, status } = error
    return (
      <>
        <h2>Error{status ? `: HTTP ${status}`:''}</h2>
        <p>{message}</p>
      </>
    )
  } else {
    return <>
      <div>{renderBasicStats(basicStats)}</div>
      <div>{renderMostContributors(mostContributors)}</div>
    </>
  }
}

function renderBasicStats(basicStats: BasicStats | null) {
  if (basicStats) {
    const { byForks, byStars } = basicStats
    return (
      <div>
        <p>{renderRepoTable('Stars', byStars)}</p>
        <p>{renderRepoTable('Forks', byForks)}</p>
      </div>
    )
  }
  return <h3>Loading...</h3>
}

function renderMostContributors(byContributors: OrderedRepos | null) {
  if (byContributors) {
    return (
      <p>
        {renderRepoTable('Contributors', byContributors)}
      </p>
    )
  }
  return <h3>Loading...</h3>
}

function renderRepoTable(propName: string, repos: OrderedRepos) {
  return (
    <table>
      <thead>
        <tr>
          <th>Repository</th>
          <th>{propName}</th>
        </tr>
      </thead>
      <tbody>
        {repos.map(repo => {
          return (
            <tr>
              <td>{repo.name}</td>
              <td>{repo.count}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default OrgStats