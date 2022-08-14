/*global chrome*/
import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [domainInfo, setDomainInfo] = useState({});
  const [domain, setDomain] = useState();
  const [currentDomainCounter, setCurrentDomainCounter] = useState(localStorage.length);

  useEffect(() => {
    async function fetchData() {
      const tab = await getCurrentTab();
      const url = tab.url;
      const domain = url.split("/")[2];
      setDomain(domain);
      const data = await getApiData(domain);
      setDomainInfo(data);
    }
      fetchData();
  
    },[])


  async function getApiData(tabUrl) {
    const reqUrl = `https://hw.arpeely.ai/domain/info?domain=${tabUrl}`;
    const headers = {
      "X-Best-Pokemon": "Poliwhirl",
    };
    const response = await fetch(reqUrl, {
      headers,
    });
    const data = await response.json();
    return data;
  }

  async function getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);

    return tab;
  }
  useEffect(() => {

    localStorage.setItem(`${domain}`, JSON.stringify(domain));
  }, [domain]);

  const resetCounter = () => {
  
    setCurrentDomainCounter (0);
    console.log("something")
    localStorage.clear();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>API Counter</h1>
        <div>
          {JSON.stringify(domainInfo, null, 2)}
          <hr/>
          {currentDomainCounter}
          <hr/>
          {/* {domain} */}
         
            {/* <h1>{localStorage.length} </h1> */}
        
        </div>
        <button className="button" onClick={resetCounter}> Reset</button>
     {/* <div>the local counter is: {localStorage.length}</div> */}
      </header>
    </div>
  );
}

export default App;
