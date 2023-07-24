import React, { use, useState } from 'react'

import Img from "/public/vercel.svg"
import Image from 'next/image';
import { InputData } from '../components/userInput/input';
import axios from "axios";
import { getData,postData } from './api/api';
import "../../global"

import { useContext } from 'react';

import FailMessage from "@/components/Failure";

import SuccessMessage from "@/components/Success";

import { patientUuidContext } from "@/components/ReportPatientContext"


const AddMedicine = () => {
     
     let uuid = useContext(patientUuidContext)

     console.log(uuid);

    //  const BASE_URL = "http://localhost:8000"

   

    let [data,setData] = useState({
        patient_uuid:uuid
    })


    console.log(data);

    let [status,setStatus] = useState({})


    let addMedicine = async(e)=>{

          e.preventDefault()


          let res = await postData(`${global.PATIENT}/${global.INSERT_MEDICINE}`,data);

          
          console.log("res",res);

          if(res.data.message == "success"){
               setStatus({...status,success:true,action:"medicine added successfully"})

       }
       else{
           setStatus({...status,failure:true,action:"failed to add medicine"})
       }

         
    }     

  return (
    <>
    {
      status.success ? <SuccessMessage setData={setData} setStatus={setStatus} action = {status.action}/>:

status.failure ? <FailMessage setData={setData} setStatus={setStatus} action = {status.action}/> :
          <div className="h-screen pageBackground">
                <div className="h-full overflow-y-scroll">

                    <div className="h-[10%] relative top-20 flex justify-center">gif</div>

                    <div className="text-white text-3xl relative top-20 w-66 capitalize flex justify-center">
                        <h2  className='capitalize '>add medication </h2>
                    </div>

                   <div className="flex flex-col justify-center items-center relative top-32 space-y-2">

                        <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4">23</div>
                              <InputData data={data}  setData= {setData} label="medicine name" className="relative" name="medicin_name"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative  items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4">23</div>
                              <InputData data={data}  setData= {setData} label="quantity number" type="number" name="quantity"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="number of times" type="number" name="Number_of_times"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="start date " name="start_date" type="date"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="end date" type="date" name="end_date"/>

                         </div>

                        
                         <div className="h-[66px]  flex w-80 justiy-center rounded-[40px] relative   items-center justify-around">
                               
                             
                              <div className='flex space-x-2'>
                                <input type='radio' className='' name='daily' id='daily' onChange={()=>{setData({...data,daily:"1"})}}/>

                                    <label htmlFor='daily' className='text-yellow-700 capitalize'>daily</label>
                              </div>
                             
                              <div className='flex space-x-2'>
                              <input type='radio' name='daily' id='weak' onChange={()=>{setData({...data,daily:"0"})} }/>
                                
                                <label htmlFor='weak' className='text-yellow-700 capitalize '>weekly</label>
                              </div>

                         </div>

                         <div className="h-10 flex justify-center" >
                                   <button className=' h-10 flex  w-60 justify-center rounded-[40px] relative items-center  orange top-2 text-black  capitalize' onClick={addMedicine} >add medicine</button>
                                </div>

                                <div className="h-40">

                                </div>

                       
                   </div>

               
                     
                       
                </div>

            </div>
}
    </>

    )
}

export default AddMedicine

// name,gender,dob,mobile,
     //    email,city,pincode,address,
     //    aadhar,password,image_url