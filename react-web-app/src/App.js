// import TestComponent from './components/test';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './scenes/Login';


function App() {
  return (
    <div className="App bg-cream-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
      {/* <TestComponent /> */}
    </div>
  );
}

export default App;
