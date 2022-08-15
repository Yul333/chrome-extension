/*global chrome*/
import "./App.css";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import getApiData from "./api/api";
import { useEffect, useState } from "react";

function App() {
  const [domainInfo, setDomainInfo] = useState({});
  const [domain, setDomain] = useState();

  const style = {
    width: "100%",
    maxWidth: 300,
    bgcolor: "background.paper",
    borderColor: "white",
    borderWidth: "2px",
    opacity: 0.5,
    borderRadius: 3,
    boxShadow: "1px 2px 9px #323232",
    fontWeight: 600,
    fontSize: "12px",
  };

  useEffect(() => {
    async function fetchData() {
      const tab = await getCurrentTab();
      const url = tab.url;
      const domain = url.split("/")[2];
      setDomain(domain);
      console.log("domain: ", domain);
      const data = await getApiData(domain);
      console.log("data", data);
      setDomainInfo(data);
      console.log("domainInfo", domainInfo);
    }
    fetchData();
  }, [domainInfo]);

  async function getCurrentTab() {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  useEffect(() => {
    if (domain !== undefined) {
      localStorage.setItem(`${domain}`, JSON.stringify(domain));
    }
  }, [domain]);

  const resetCounter = () => {
    localStorage.clear();
  };

  return (
    <div className="App">
      <div className="animate-character">IP Counter</div>
      <List sx={style} component="nav">
        <ListItem>
          <ListItemText primary="IP" />
          <div> {domainInfo.ip}</div>
        </ListItem>
        <Divider />
        <ListItem divider>
          <ListItemText primary="Location" />
          <div> {domainInfo.location}</div>
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Country code" />
          <div> {domainInfo.country_code}</div>
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Organization" />
          <div style={{ textAlign: "right" }}> {domainInfo.organization}</div>
        </ListItem>
        <ListItem divider>
          <ListItemText primary="Domain" />
          <div>{domain}</div>
        </ListItem>
        <ListItem>
          <ListItemText primary="Rank" />
          <div> {domainInfo.rank}</div>
        </ListItem>
      </List>
      {/* </div> */}
      <div>
        <div className="buttons">
          <ButtonGroup variant="contained">
            <Button style={{ textTransform: "none" }} onClick={resetCounter}>
              {" "}
              Reset Counter
            </Button>
            <Button disableRipple={true}> {localStorage.length}</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default App;
