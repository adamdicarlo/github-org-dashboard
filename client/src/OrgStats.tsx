import React, { useEffect, useState } from 'react';

// View model for error handling.
interface APIError {
  status?: number
  message?: string
}

// View model and API response format.
interface BasicStats {
  forks: number
  repos: number
  stars: number
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

  if (basicStats) {
    const { forks, repos, stars } = basicStats
    return (
      <div>
        <p>Stars: {stars}</p>
        <p>Forks: {forks}</p>
        <p>Repos: {repos}</p>
      </div>
    )
  } else if (error) {
    const { message, status } = error
    return (
      <div>
        <h2>Error{status ? `: HTTP ${status}`:''}</h2>
        <p>{message}</p>
      </div>
    )
  } else {
    return (
      <h2>Loading...</h2>
    )
  }
}

export default OrgStats