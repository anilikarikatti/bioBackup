import React, { use, useState } from 'react'

import Img from "/public/vercel.svg"
import Registeration from '/public/images/registration.gif';
import Image from 'next/image';
import { InputData } from '../components/userInput/input';
import Male from '/public/images/male.gif'
import Female from '/public/images/female.gif'
import AddImage from '/public/images/add_image.gif'


import axios from "axios";
import { getData,postData } from './api/api';
import "../../global"

const AddMember = () => {


     const BASE_URL = "http://localhost:8000"

    let[file,setFileName] = useState("")

    let[ofile,setoFileName] = useState("")

    let [data,setData] = useState({})

    console.log(file.name);

    console.log(data);


//     console.log(s3Url);

    let registerUser = async(e)=>{

          e.preventDefault()

                  
          let res = await postData(`${global.PATIENT}/${global.ADD}/${localStorage.getItem("uuid")}`,{...data,image_url:file.name});

          
          console.log("res",res);

          // console.log(res.data.response);
          let s3  = `https://user-and-patient-pics.s3.amazonaws.com/profile/${file.name}`

          // https://user-and-patient-pics.s3.amazonaws.com/profile/test222.png 

          let upload = await fetch(s3,{
               method: 'PUT',
               body:file,
               headers: {
                 'Content-Type': 'multipart/form-data',
             },
          })

          console.log("upload");
          console.log(upload );

         
    }     

  return (
    <>

    <div className="h-screen pageBackground py-5">
                <div className="h-full overflow-y-scroll">

                    <div className="flex justify-center"><Image src={Registeration} className='h-full w-1/2' alt='img1'/></div>

                    <div className="text-white text-3xl w-66 capitalize flex justify-center">
                        <h2  className='capitalize '>add member </h2>
                    </div>

                   <div className="flex flex-col justify-center items-center relative top-12 space-y-2">

                        <div className="h-16 background flex w-80 justiy-center rounded-[40px] relative items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4">23</div>
                              <InputData data={data}  setData= {setData} label="full name" className="relative" name="name"/>

                         </div>

                         <div className="h-16 background flex w-80 justiy-center rounded-[40px] relative  items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4">23</div>
                              <InputData data={data}  setData= {setData} label="mobile number" type="text" name="mobile"/>

                         </div>

                         <div className="h-16 background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="email" type="email" name="email"/>

                         </div>

                         <div className="h-16 background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="city" name="city"/>

                         </div>

                         <div className="h-16 background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="pincode" type="text" name="pincode"/>

                         </div>

                         <div className="h-16 background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="adhar number" type="text" name="aadhar"/>

                         </div>

                         <div className="h-16 background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="address" name="address"/>

                         </div>

                         <div className="h-16 background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} placeholder="dob" type="date" className="" name="dob" label="date of birth"/>

                         </div>
                         <h2 className='capitalize text-white w-[80vw]'>Gender </h2>
                         <div className="h-16 background flex w-80 justiy-center rounded-[40px] relative   items-center justify-around">
                              <div className={data.gender == "M" ? "h-full w-1/2 rounded-[50px] relative justify-center  flex items-center orange w-20 rounded-lg " :"  relative justify-center textColor flex items-center " } onClick={()=>setData({...data,gender:"M"})}><Image width={60} src={Male} alt='img2'/> male</div>
                              
                              <div className={data.gender == "F" ? " h-full w-1/2 rounded-[50px] relative justify-center  flex items-center orange w-20 rounded-lg " :"  relative justify-center textColor flex items-center " }onClick={()=>setData({...data,gender:"F"})} ><Image width={40} src={Female} alt='img3'/> female</div>

                         </div>



                        <div>

                        <div className="">
                                <h2 className='capitalize text-white'>relationship </h2>
                            </div>
                         <div className="h-10 background flex  w-80 justiy-center rounded-[40px] relative   items-center orange top-4" >
                            {/* <label htmlFor="Doctype">select</label> */}
                            <select name="Doctype" id="Doctype" className="orange relative left-4 w-72 bd text-black " > 
                                <option id="1" >select</option>
                                <option id="1">1</option>
                                <option id="1">1</option>
                                <option id="1">1</option>
                                <option id="1">1</option>
                                <option id="1">1</option>
                            </select>                             

                        </div>
                        </div>

                       
                   </div>

               
                   <div className="relative top-28">
                            <div className=" flex  justify-center items-center" >
                                    <label htmlFor="file"><Image src={AddImage} height={100} width={100} alt='profile' className='rounded-[50%] bg-orange-50/30 cursor-pointer'></Image></label>
                            </div>
                           
                            
                            <div className="relative top-8 text-center flex justify-center">{!file  ? "" : <Image src={ofile} height={80} width={100} alt="image" className='rounded-full'/>}</div>
                            <input type="file" id="file" hidden onChange={(e)=>{let data = setFileName(e.target.files[0])
                                            setoFileName(URL.createObjectURL(e.target.files[0]))

                                            console.log(e.target.files[0].name);
                                            }}></input>

                               
                              <div className="h-16 flex justify-center " >
                                   <button className=' h-14 flex text-white  w-60 justify-center rounded-[40px] relative items-center  orange top-20 text-black  capitalize' onClick={registerUser} >Register</button>
                              </div>


                        </div>

                       
                </div>

            </div>
     
    </>

    )
}

export default AddMember

// name,gender,dob,mobile,
     //    email,city,pincode,address,
     //    aadhar,password,image_url