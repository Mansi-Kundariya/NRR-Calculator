import "./App.css";
import { NRRCalculator } from "./components/NRRCalculator";

function App() {
  return (
    <main className="min-h-screen from-background via-background to-secondary/20">
      <div className="px-6 md:px-12 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src="../logo.png"
              alt="App Logo"
              className="h-10 w-10"
            />
            <h1 className="text-4xl font-bold text-primary mb-2 tracking-tight">
              IPL NRR Calculator
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Calculate Net Run Rate scenarios for strategic match planning
          </p>
        </header>

        <NRRCalculator />
      </div>
    </main>
  );
}

export default App;
