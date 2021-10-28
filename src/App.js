import * as React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import HandleAsset from './components/HandleAsset';

function App() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CivicPlus - <span>Assets Manage</span></h1>
        <Button variant="contained" onClick={handleClickOpen}>Handle Assets</Button>
        <HandleAsset status={open} onClose={handleClose} />
      </header>
    </div>
  );
}

export default App;
