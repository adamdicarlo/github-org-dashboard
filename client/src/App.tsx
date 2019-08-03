import React, { useRef, useState } from 'react';
import './App.css';
import OrgStats from './OrgStats';

const App: React.FC = () => {
  const inputEl = useRef<HTMLInputElement>(null)
  const [orgName, setOrgName] = useState<string | null>(null)

  const onClick = () => {
    setOrgName(inputEl.current!.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        {orgName
          ? <OrgStats name={orgName} />
          : <div>
              <input
                type='text'
                placeholder='Organization name'
                ref={inputEl}
              />
              <button onClick={onClick}>Go</button>
            </div>
        }
      </header>
    </div>
  )
}

export default App
