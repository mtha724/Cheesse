
import GamePage from './pages/GamePage'
import { MoveLogProvider } from './features/history/moveLogStore'
import './App.css'

function App() {
  return (
    <MoveLogProvider>
      <div className="delicious-cheese-container">
        <GamePage />
      </div>
    </MoveLogProvider>
  )
}

export default App