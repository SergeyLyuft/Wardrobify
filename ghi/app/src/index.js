import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



async function loadWardrobe() {
  // const shoeResponse = await fetch('http://localhost:8080/api/shoes')
  const hatsResponse = await fetch('http://localhost:8090/api/hats');
  if (hatsResponse.ok) {
    // let shoeData = await shoeResponse.json()
    let hatData = await hatsResponse.json()
    root.render(
      <React.StrictMode>
        <App hats={hatData} />
      </React.StrictMode>
    );
  } else {
    throw console.error(hatsResponse);
  }
  
}
loadWardrobe();