import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { routes } from './routers';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            >
              {route.children &&
                route.children.map((child, i) => (
                  <Route
                    key={i}
                    path={child.path}
                    element={child.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
