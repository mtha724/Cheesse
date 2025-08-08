import cheesePixel from './assets/pixel-cheese.png'
import './App.css'

function App() {
  return (
    <>
      <h1>Cheese Mongers</h1>
      <div className="delicious-cheese-container">
        <img src={cheesePixel} className="delicious-cheese" alt="Cheese logo" />
      </div>
      <p className="description"> 
        The finest selection of cheeses from around the world. <br />
        Integrated into a chess game. <br />
      </p>
    </>
  )
}

export default App
