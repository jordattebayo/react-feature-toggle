import './App.css'
import { Dialog } from './Dialog'
import { useEffect, useState } from 'react'

function App() {
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const [showNews, setShowNews] = useState("loading");

    function requestDialogOpen() {
        if (isDialogOpen) return
        setIsDialogOpen(true)
    }

    function requestDialogClose() {
        setIsDialogOpen(false)
    }

    function toggleDialog() {
        setIsDialogOpen(isDialogOpen => !isDialogOpen)
    }

    useEffect(() => {
        const fetchFlag = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_BASE}feature`);
            const data = await res.text();
            setShowNews(data);            
        }
        fetchFlag().catch((err) => console.error(err))
    },[])

    return (
        <>
            {(showNews === "enabled") ? <Dialog toggleDialog={toggleDialog} requestDialogClose={requestDialogClose} requestDialogOpen={requestDialogOpen} isDialogOpen={isDialogOpen} /> : null}
            <h1>React Feature Toggle</h1>
            <p className="read-the-docs">
                To show the news pop up update the ShowNews variable in appsettings.json: <code>VITE_SHOW_NEWS</code>
            </p>
            <p>The current value for ShowNews is: {showNews}</p>
            <button onClick={() => requestDialogOpen()} disabled={!(showNews === "enabled")}>Open News Pop-up</button>
        </>
    )
}

export default App
