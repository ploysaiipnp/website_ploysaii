import { useState } from "react";

const useModalHook = (option) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (option?.insideHandleOpen) {
      option.insideHandleOpen();
    }
    setOpen(true);
  };

  const handleClose = () => {
    if (option?.insideHandleClose) {
      option.insideHandleClose();
    }
    setOpen(false);
  };

  return { open, setOpen, handleOpen, handleClose };
};
export default useModalHook;

//----------------------------------
// ::: How to use "insideHandle" :::
// const {
//     open: open
//     handleOpen: _handleOpen
//     handleClose:_handleClose
// } = useModalHook({
//     insideHandleOpen: () => { console.log('action') },
//     insideHandleClose: () => { console.log('action') },
// })
//----------------------------------
