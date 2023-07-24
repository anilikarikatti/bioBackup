import React, { use, useState } from 'react'

import Img from "/public/vercel.svg"
import Image from 'next/image';
import { InputData } from '../components/userInput/input';
import axios from "axios";
import "../../global"
import { useRouter } from 'next/router';
import FailMessage from '@/components/Failure';

const Register = () => {



    let[file,setFileName] = useState("")

    let[ofile,setoFileName] = useState("")

    let [data,setData] = useState({})

    let [status,setStatus] = useState({})
     
    const router = useRouter()

    let registerUser = async(e)=>{

          e.preventDefault()


          let resp = await axios.get(`${global.BASE_URL}/${global.GETS3URL}/${file.name}/${global.PROFILE}`);

          let res = await  axios.post(`${global.BASE_URL}/${global.USER}/${global.ADD}`,{...data,image_url:file.name},{headers:{
                         'Content-type':"application/json"
               }})

          let {url} = resp.data

          let upload = await fetch(url,{
               method: 'PUT',
               body:file,
               headers: {
                 'Content-Type': 'multipart/form-data',
             },
          })

          console.log(upload,url );
          console.log(res);
          
          if(res.data.message == "success"){
          window.localStorage.setItem("token",res.data.response.accessToken) 
           
          window.localStorage.setItem("uuid",res.data.response.uuid)
          
               router.push("/home")
          }
          else{
               // router.push("/register")

               console.log(res.data.message);
               setStatus({...status,failure:true,action:res.data.message})
               setFileName("")
               setoFileName("")

          }


          

    }     

  return (
    <>

    <div className="h-screen pageBackground">
                <div className="h-full overflow-y-scroll">


                    <div className="h-[10%] relative top-20 flex justify-center">gif</div>

                    <div className="text-white text-3xl relative top-20 w-66 capitalize flex justify-center">
                        <h2  className='capitalize '>register </h2>
                    </div>
                    {status.failure ? <FailMessage action={status.action} setStatus={setStatus} setData={setData}/> : 
          <form onSubmit={registerUser}>

                   <div className="flex flex-col justify-center items-center relative top-32 space-y-2">

                        <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4">23</div>
                              <InputData data={data}  setData= {setData} label="full name" className="relative" name="name" required="true"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative  items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4">23</div>
                              <InputData data={data}  setData= {setData} label="mobile number" type="number" name="mobile" pattern="[0-9]{10}"  required="true"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="email" type="email" name="email" required="true"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="city" name="city" required="true"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="pincode" type="number" name="pincode" required="true"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="adhar number" type="number" name="aadhar" required="true"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} label="address" name="address" required="true"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center ">
                              <div className=" h-10 relative w-6 justify-center textColor flex items-center left-4 ">23</div>
                              <InputData data={data}  setData= {setData} placeholder="dob" type="date" className="" name="dob" label="date of birth" required="true"/>

                         </div>

                         <div className="h-[66px] background flex w-80 justiy-center rounded-[40px] relative   items-center justify-around">
                              <div className={data.gender == "M" ? " h-8 relative justify-center  flex items-center orange w-20 rounded-lg " :" h-10 relative justify-center textColor flex items-center " } onClick={()=>setData({...data,gender:"M"})}>male</div>
                              
                              <div className={data.gender == "F" ? " h-8 relative justify-center  flex items-center orange w-20 rounded-lg " :" h-10 relative justify-center textColor flex items-center " }onClick={()=>setData({...data,gender:"F"})} >female</div>

                         </div>


                       
                   </div>

               
                       <div className="relative top-44    ">
                            <div className=" flex text-2xl space-x-32 justify-center items-center" >
                                    <label className="relative left-4 " htmlFor="file"><Image src={Img} height={80} width={80} alt='profile' className='border border-white'></Image></label>
                            </div>
                           
                            
                            <div className="relative top-8 text-center flex justify-center">{!file  ? "" : <Image src={ofile} height={80} width={100} alt="image" className='rounded-full'/>}</div>
                            <input type="file" id="file" hidden onChange={(e)=>{let data = setFileName(e.target.files[0])
                                            setoFileName(URL.createObjectURL(e.target.files[0]))

                                            console.log(e.target.files[0].name);
                                            }}></input>

                               

                                <div className="h-10 flex justify-center" >
                                   <button className=' h-10 flex  w-60 justify-center rounded-[40px] relative items-center  orange top-20 text-black  capitalize' type='submit' >register</button>
                                </div>

                                <div className="h-40">

                                </div>
                        </div>
                    
                </form>
}   
                </div>
            </div>
     
    </>

    )
}

export default Register

// name,gender,dob,mobile,
     //    email,city,pincode,address,
     //    aadhar,password,image_url