import Image from 'next/image'
import Fail from '../../public/images/fail.png' 
import { useState } from 'react'

function FailMessage({action,setData,setStatus}){
    return(
        <div className="  h-full w-screen absolute flex justify-center items-center z-[100] ">
            <div className='bg-white p-10 rounded-lg'>
                <div className='flex justify-center '><Image src={Fail} alt='success'/></div>
                <p className='text-center p-3 text-black'>{action}</p>
               
                <div className='flex justify-center p-3'>
                    <button className='rounded-lg bg-blue-800 text-white py-2 px-10' onClick={()=>{setData("");setStatus("")}}>Okay</button>
                </div>
            </div>
        </div>
    )
}
export default FailMessage
