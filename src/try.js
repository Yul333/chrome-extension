/*global chrome*/
import "./App.css";

import { useEffect, useState } from "react";

function App() {
  const [domainInfo, setDomainInfo] = useState({});
  const [domain, setDomain] = useState('');
  const [currentDomainCounter, setCurrentDomainCounter] = useState(localStorage.length);

  useEffect(() => {
    async function fetchData() {
      const tab = await getCurrentTab();
      const url = tab.url;
      const domain = url.split("/")[2];
      setDomain(domain);
      fetchData();
      console.log("tab ", tab);
    }},[domain])
      // chrome.storage.sync.get('DomainChromeExt', function( savedData){
        // const savedData = localStorage.getItem('DomainChromeExt');
        // console.log('data', savedData);
        // const domainObj = savedData ? JSON.parse(savedData) : {};

        // if (!domainObj[domain]) {
        //   domainObj[domain] = 0;
        // }
        // domainObj[domain] = domainObj[domain] + 1;

        // console.log('domainObj: ', domainObj);
        // console.log('stringify: ', JSON.stringify(domainObj));
        
        // chrome.storage.sync.set({'DomainChromeExt': JSON.stringify(domainObj) }, function(){
          // localStorage.setItem('DomainChromeExt', JSON.stringify(domainObj));
          // setCurrentDomainCounter(domainObj[domain]);
        // });
      // });

      // if (!domains.includes(domain)) {
      //   setDomains([domain, ...domains]);
      // }

     
      
      // console.log("domain: ", domain);
      // const data = await getApiData(domain);
      // setDomainInfo(data);
      // console.log("domainInfo", domainInfo);
      // console.log("data", data);
    // }
    // fetchData();
    // insertLocalStorage(domain)
    console.log("yulia 555");
  // }, );

  function resetDoamin(){
    const savedData = localStorage.getItem('DomainChromeExt');
    const domainObj = savedData ? JSON.parse(savedData) : {};
    domainObj[domain] = 0;
    localStorage.setItem('DomainChromeExt', JSON.stringify(domainObj));
   
  }

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

  // const dummyData =  {
  //   'facebook.com': 2,
  //   'stackoverflow.com': 4
  // };
  // chrome.storage.sync.set({ 'yulia': JSON.stringify(dummyData) }, function(){
  //     //  A data saved callback omg so fancy
  //     chrome.storage.sync.get('yulia', function(savedData){
  //       console.log('saved data', savedData);
  //     });
      
  //   });

  return (
    <div className="App">
      <header className="App-header">
        <h1>API Counter</h1>
        <div>
          {JSON.stringify(domainInfo, null, 2)}
          <hr/>
          {currentDomainCounter}
          <hr/>
          {domain}
         
            <h1>{localStorage.length} </h1>
        
        </div>
        <button className="button"> Reset</button>
     
      </header>
    </div>
  );
}

export default App;
