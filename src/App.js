import React from 'react';

import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Breadcrumbs breadcrumbs={[]} onClick={() => {}} />
      </header>
    </div>
  );
}

export default App;
