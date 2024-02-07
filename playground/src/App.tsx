import './App.css'
import { widget } from './widget'

function App() {
  return (
    <>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {widget.type}
    </>
  )
}

export default App
