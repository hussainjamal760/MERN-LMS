import React,{Component, FC} from 'react'
import {Modal , Box} from "@mui/material"

type Props = {
      open: boolean;
      setOpen: (open: boolean) => void;
      activeItem: number;
      route:string,
      setRoute : (route:string)=>void
}

const CustomModel: FC<Props> = ({open , setOpen , activeItem , route,setRoute}) => {
  return (
    <Modal 
    open={open}
    onClose={()=> setOpen(false)}
    arial-labeledby="modal-modal-title"
    aria-describedby='modal-modal-description'
    >
        
    <Box
    className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900">
    <Component setOpen = {setOpen} setRoute={setRoute}/>
    </Box>
    </Modal>
  )
}

export default CustomModel