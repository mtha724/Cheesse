/* This is the main application component */
// ---------------- Imports ---------------- //
import StartPage from './pages/StartPage'
import { MoveLogProvider } from './chess/components/history/moveLogStore'
import './App.css'

/**
 * App component - main entry point for the application.
 * @returns {JSX.Element} - The rendered app component.
 */
function App() {
  return (
    <MoveLogProvider>
      <div className="delicious-cheese-container">
        <StartPage />
      </div>
    </MoveLogProvider>
  )
}

export default App;