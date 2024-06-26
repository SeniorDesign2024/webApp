// import TestComponent from './components/test';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './scenes/Login';
import SignUp from './scenes/SignUp'
import MyEvents from './scenes/MyEvents';
import Auth from './components/test';
import CreateEvent from './scenes/CreateEvent';
import UserDetails from './scenes/UserDetails';
import EventDetails from './scenes/EventDetails';
import AboutPage from './scenes/AboutPage';


function App() {
  return (
    <div className="App bg-cream-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/my-events" element={<Auth component = {MyEvents} />}/>
          <Route path="/create-event" element={<Auth component={CreateEvent} />} />
          <Route path="/user-info" element={<Auth component={UserDetails} />} />
          <Route path="/event-details/:eventId" element={<Auth component={EventDetails} />} /> 
          <Route path="/about-page" element={<Auth component={AboutPage} />} />
        </Routes>
      </BrowserRouter>
      {/* <TestComponent /> */}
    </div>
  );
}

export default App;
