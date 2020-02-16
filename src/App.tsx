import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function Connect(props: any) {
  const [charvalue, setcharvalue] = useState<any>(null);

  useEffect(() => {
    async function getChar() {
      if (!navigator.bluetooth) {
        return;
      }
      const service = await navigator.bluetooth.requestDevice({ filters: [{ services: ['19B10000-E8F2-537E-4F6C-D104768A1214']}]})
      .then((device: BluetoothDevice) => device.gatt ? device.gatt.connect() : Promise.reject(("undefined")))
      .then((server: BluetoothRemoteGATTServer) => server.getPrimaryService('19B10000-E8F2-537E-4F6C-D104768A1214'));
  
      const char = await service.getCharacteristic("2A19");
      const value = await char.readValue();
      setcharvalue(value);
    }
    getChar();
  }, []);


  return (
    <div>
      value: {charvalue}
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Connect />
      </header>
    </div>
  );
}

export default App;
