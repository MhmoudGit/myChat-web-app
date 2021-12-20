import "./App.css";
import WelcomePage from "./components/WelcomePage";
import Nav from "./components/nav";
import { auth } from "./components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedIn from "./components/LoggedIn";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <Nav />
        {user ? <LoggedIn /> : <WelcomePage />}
      </div>
    </Router>
  );
}

export default App;
