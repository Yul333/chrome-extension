/*global chrome*/
import "./App.css";

import { useEffect, useState } from "react";
// import { tab } from "@testing-library/user-event/dist/tab";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [domainInfo, setDomainInfo] = useState("");
  const [domain, setDomain] = useState("");
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const uniqueId = uuidv4()
  //   localStorage.setItem(uniqueId, JSON.stringify(domain));
  // }, [domain]);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('items'));
  //   if (items) {
  //    setItems(items);
  //   }
  // }, []);

  //async function fetchdata get the info of current tab from chrome
  //response assigned to a const called tab
  //from the tab data we get the url which sets as a state & send to get apiData
  useEffect(() => {
    async function fetchData() {
      const tab = await getCurrentTab();
      const url = tab.url;
      const domain = url.split("/")[2];
      console.log("tab", tab);
      setDomain(domain);
      console.log("domain: ", domain);
      const data = await getApiData(domain);
      setDomainInfo(data);
      console.log("domainInfo", domainInfo);
      console.log("data", data);
    }
    fetchData();
    // insertLocalStorage(domain)
    console.log("yulia");
  }, [domainInfo]);

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
  // async function insertLocalStorage(domain){
  //     const uniqeId = uuidv4()
  //     localStorage.setItem(uniqeId, JSON.stringify(domain));
  //   };
  async function getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);

    return tab;
  }
  useEffect(() => {
    const uniqueId = uuidv4();
    localStorage.setItem(uniqueId, JSON.stringify(domain));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>API Counter</h1>
        <div>
          {JSON.stringify(domainInfo, null, 2)}

          {domain}
          <div>
            <h1>{localStorage.length} </h1>
          </div>
        </div>
        <button className="button"> Reset</button>
      </header>
    </div>
  );
}

export default App;
