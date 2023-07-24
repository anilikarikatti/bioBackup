import Image from 'next/image'
import Success from '../../public/images/success.png' 
import { useState } from 'react'

function SuccessMessage({action,setData,setStatus}){
    return(
        <div className={"bg-black/30 h-screen w-screen absolute flex justify-center items-center z-[100] "}>
            <div className='bg-white p-10 rounded-lg'>
                <div className='flex justify-center '><Image src={Success} alt='success'/></div>
                <p className='text-center p-3 text-black capitalize'>{action}</p>
                <p className='rounded-lg bg-blue-100/60 p-2 text-center'></p>
                <div className='flex justify-center p-3'>
                    <button className='rounded-lg bg-blue-800 text-white py-2 px-10' onClick={()=>{(setStatus) ? setStatus("") : "";(setData) ? setData("") : "";
                    }}>Okay</button>
                </div>
            </div>
        </div>
    )
}
export default SuccessMessage