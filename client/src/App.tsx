import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import OrgStats from './OrgStats';

const App: React.FC = () => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [orgName, setOrgName] = useState<string | null>(null)

  useEffect(() => {
    inputEl.current!.focus()
  }, [])

  const go = () => void setOrgName(inputEl.current!.value)
  const onKeyPress = (e: React.KeyboardEvent) => {
    console.log(e)
    if (e.key === 'Enter') {
      go()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {orgName
          ? <div>
              <h1>{orgName} on GitHub</h1>
              <div><OrgStats name={orgName} /></div>
              <p>
                <button onClick={() => setOrgName(null)}>Start over</button>
              </p>
            </div>
          : <div>
              <h1>GitHub Organization Stats</h1>
              <p>Which org would you like to query?</p>
              <p>
                <input
                  onKeyPress={onKeyPress}
                  placeholder='Organization name'
                  ref={inputEl}
                  type='text'
                />
                <button onClick={go}>Go</button>
              </p>
            </div>
        }
      </header>
    </div>
  )
}

export default App
