import './App.css';
import { CreateUser } from './components/CreateUser';
import { UserList } from './components/UserList';
import { useState } from 'react';

function App() {
  const [showUserList, setShowUserList] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button
            style={{ backgroundColor: showUserList ? '#3c425c' : 'white' }}
            className="tabButton"
            onClick={() => setShowUserList(false)}
          >
            Skapa användare
          </button>
          <button
            style={{ backgroundColor: showUserList ? 'white' : '#3c425c' }}
            className="tabButton"
            onClick={() => setShowUserList(true)}
          >
            Lista användare
          </button>
          {showUserList ? <UserList /> : <CreateUser />}
        </div>
      </header>
    </div>
  );
}

export default App;
