import { useState, useEffect } from "react";
import facade from '../utils/apiFacade';

function LoggedIn() {
    const [dataFromServer, setDataFromServer] = useState("Loading...")
    
    useEffect(() => {
      facade.fetchData().then(
        (data) => {
          setDataFromServer(JSON.stringify(data))
        })
      }, [])
  
    return (
      <div>
        <h2>Data Received from server</h2>
        <h3>{dataFromServer}</h3>
      </div>
    )
  }

  export default LoggedIn;