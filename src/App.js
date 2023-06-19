import "./App.css";
import Navbar from "./components/navbar";
import DashboardComponent from "./components/dashboardComponent";
function App() {
  return (
    <>
      <div className="App">
        <Navbar></Navbar>
      </div>
      <DashboardComponent></DashboardComponent>
    </>
  );
}

export default App;
