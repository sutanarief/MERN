import "./App.css";
import Navbar from "./components/Navbar";
import Table from "./pages/Table";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Table />
        </Route>
      </Switch>
    </>
  );
}

export default App;
