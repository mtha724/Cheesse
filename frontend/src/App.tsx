
import StartPage from './pages/StartPage'
import { MoveLogProvider } from './features/history/moveLogStore'
import './App.css'

function App() {
  return (
    <MoveLogProvider>
      <div className="delicious-cheese-container">
        <StartPage />
      </div>
    </MoveLogProvider>
  )
}

export default App