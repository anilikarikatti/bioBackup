import { useState } from "react";

import { TextField } from '@mui/material';



export  function InputData({label,type,placeholder,data,setData,name,required}){

  // console.log(pattern);
  return(
    <>
       <div className='relative  left-6'>

        <TextField id="outlined-basic" label={label} type={type ? type :"text"} name={name}  required = {required ? required : ""}
        sx={{"& label " : {
            top:-8,
            color:"#bcaaa4"
        }}} variant="standard" 
       
      
        InputProps={{  
         
          style:{
            height:"30px",
            color:"#bcaaa4",
            border : "0px",
            outline:"0px",
            width:"250px",
            
        },
      
        }} className="capitalize  relative items-center flex " onChange={(e)=>setData({...data,[e.target.name]:e.target.value})}/>

</div>

    </>
  )
}

// export function InputDate({label}){


//   return(
//     <>
//       <div>
//     <DatePicker />
//       </div>
//     </>
//   )
// }