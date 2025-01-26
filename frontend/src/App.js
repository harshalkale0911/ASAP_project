import DogForm from "./components/DogForm";
import DogList from "./components/DogList";

function App() {
  return (
    <div>
      <h1>Funny Dog Names 🐶</h1>
      <DogForm refresh={() => window.location.reload()} />
      <DogList />
    </div>
  );
}

export default App;
