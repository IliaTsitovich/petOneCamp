import React from "react";
import MyMapComponent from "./components/Map/Map";
import SaveData from "./components/SaveData/SaveData";
import DataList from "./components/DataList/DataList";
function App() {
  return (
    <>
      <div >
        <p>MAP IS MAP</p>
        <SaveData />
        {/* <MyMapComponent /> */}
        <DataList/>
      </div>
    </>
  );
}

export default App;
