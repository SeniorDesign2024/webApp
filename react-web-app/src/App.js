// import TestComponent from './components/test';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './scenes/Login';
import SignUp from './scenes/SignUp'
import MyEvents from './scenes/MyEvents';
import Auth from './components/test';


function App() {
  return (
    <div className="App bg-cream-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/my-events" element={<Auth component = {MyEvents} />}/>
        </Routes>
      </BrowserRouter>
      {/* <TestComponent /> */}
    </div>
  );
}

export default App;
