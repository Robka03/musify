import './App.css';
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";

function App() {
  return (
    <>
      <div className="App">
        <Navbar/>
        <Main></Main>
        <Footer/>
      </div>
    </>
  );
}

export default App;
