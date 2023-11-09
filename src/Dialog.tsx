import { useEffect, useRef, useCallback } from "react";

interface DialogProps {
    toggleDialog: () => void;
    requestDialogClose: () => void;
    requestDialogOpen?: () => void;
    isDialogOpen: boolean;
}

export function Dialog({toggleDialog, requestDialogClose, isDialogOpen}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const firstRender = useRef<boolean>(false);

  const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
      const { key } = event;
      if(event.ctrlKey == true){
        if(key === "Shift"){
          toggleDialog();
        } 
      } else if (key === "Escape"){
        event.preventDefault();
        requestDialogClose();
      }
  }, [requestDialogClose, toggleDialog]);

  const handleCancelEvent = useCallback((event: Event) => {
    event.preventDefault();
    requestDialogClose()
    if(isDialogOpen) requestDialogClose()
  }, [isDialogOpen, requestDialogClose])

  const handleCloseEvent = useCallback((event: Event) => {
    event.preventDefault();
    if(isDialogOpen) requestDialogClose()
  }, [isDialogOpen, requestDialogClose])



  //Effect to provide support for keyboard commands & listen for cancel events to close dialog
  useEffect(() => {
    const dialogNode = dialogRef.current
    if (dialogNode != null) {
        dialogNode.addEventListener('close', handleCloseEvent);
        dialogNode.addEventListener('cancel', handleCancelEvent);
    }     

      window.addEventListener("keydown", handleUserKeyPress);
      return () => {
        if (dialogNode != null) {
            dialogNode.removeEventListener('close', handleCloseEvent)
            dialogNode.addEventListener('cancel', handleCancelEvent);
        }
          window.removeEventListener("keydown", handleUserKeyPress);
      };
  }, [handleCancelEvent, handleCloseEvent, handleUserKeyPress]);


  //Effect to hook into native dialog browser api
  useEffect(() => {
    if( firstRender.current){
      firstRender.current = false;
    } else {
      const dialogNode = dialogRef.current
      if(dialogNode) {
        if(isDialogOpen && !dialogNode.hasAttribute('open')){
          dialogNode.showModal()
        } else {
          dialogNode.close()
        }
      }
    }
  },[isDialogOpen])

  return (
    <dialog ref={dialogRef}>
        <div id="favDialog">
        This dialog is a feature that is toggleable!
        <button value="close" onClick={() => requestDialogClose()} >Close</button>
        </div>

    </dialog>
  );
} 