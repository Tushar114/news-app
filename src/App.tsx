import HomePage from "./components/HomePage/HomePage";
import { Navbar } from "./components/Navbar/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto">
        <HomePage />
      </div>
    </>
  );
}

export default App;
