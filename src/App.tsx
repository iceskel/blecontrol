import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function Connect(props: any) {
  const [charvalue, setcharvalue] = useState<any>(null);
  const [ngage, setngage] = useState<any>(null);

  useEffect(() => {
    async function getChar() {
      if (!navigator.bluetooth) {
        console.log('bluetooth not found');
        return;
      }
      const service = await navigator.bluetooth.requestDevice({ filters: [{ services: ['19b10000-e8f2-537e-4f6c-d104768a1214']}]})
      .then((device: BluetoothDevice) => device.gatt ? device.gatt.connect() : Promise.reject(("undefined")))
      .then((server: BluetoothRemoteGATTServer) => server.getPrimaryService('19b10000-e8f2-537e-4f6c-d104768a1214'));
  
      const char = await service.getCharacteristic(0x2A19);
      const value = await char.readValue();
      console.log('bluetooth found');
      setcharvalue(value.getUint8(0));
    }
    getChar();
  }, [ngage]);


  return (
    <div>
      value: {charvalue}
      <button onClick={() => setngage(Math.random() * 5)}>lmao</button>
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
