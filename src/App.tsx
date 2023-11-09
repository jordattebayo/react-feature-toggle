import './App.css'
import { Dialog } from './Dialog'
import { useState } from 'react'

const showNews: boolean = import.meta.env.VITE_SHOW_NEWS === "true" ? true : false

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);

  function requestDialogOpen(){
    if (isDialogOpen) return 
    setIsDialogOpen(true)
  }

  function requestDialogClose(){
    setIsDialogOpen(false)
  }

  function toggleDialog(){
    setIsDialogOpen(isDialogOpen => !isDialogOpen)
  }

  return (
    <>
      { showNews ? <Dialog toggleDialog={toggleDialog} requestDialogClose={requestDialogClose} requestDialogOpen={requestDialogOpen} isDialogOpen={isDialogOpen} /> : null }
      <h1>React Feature Toggle</h1>
      <p className="read-the-docs">
        To show the news pop up update the .env.local variable: <code>VITE_SHOW_NEWS</code> 
      </p>
      <p>The current value for SHOW_NEWS is: {import.meta.env.VITE_SHOW_NEWS}</p>
      <button onClick={() => requestDialogOpen()} disabled={!showNews}>Open News Pop-up</button>
    </>
  )
}

export default App
