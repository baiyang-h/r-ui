import './App.css';
import { Routes, Route } from "react-router-dom";
import router from '@/router'

function App() {
  return (
    <div className="App">
      <Routes>
        {
          router.map((item, index) => <Route key={item.path} path={item.path} element={<item.component />} />)
        }
      </Routes>
    </div>
  );
}

export default App;
