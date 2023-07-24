
import Image from "next/image"
// import logo from "../../../public/vercel.svg"

import Home from "./home"

import logo from "../../../public/favicon.ico"
import Banner from "./banner"
import HealthMain from "./healthStatusMainPage"
import { useState } from "react"
export default function MainPage(){

    let[currentPage ,setCurrentPage] = useState({
        home:false,
        health:false,
        file:false,
        add:true
    })
    return(


        <>
            <div className="h-screen  bg-black overflow-y-hidden overflow-x-hidden">
                <div className="flex top-0 fixed justify-center items-center  background w-full " >
                    <h2 className="capitalize text-white">mybio backup</h2>
                    <Image src={logo} width={50} height ={50} alt="scanner" className="relative left-20 " ></Image>
                </div>

                    {/* 
                    data */}
                    <div className="h-full overflow-y-scroll overflow-x-hidden ">
                    <div className="relative  w-[305px] left-6  top-20">
                        {(currentPage.home || currentPage.add)? <div>
                            <Home status = {currentPage.home}/>
                             { currentPage.home ? <Banner/> : ""}
                        </div> : ""}

                        {(currentPage.health || currentPage.file ) ? <div>
                            <HealthMain status={currentPage.health}/>
                        </div> : ""}
                        {/* health status */}

                      
                    </div>
                </div>
                
                {/* footer */}

              <div className="fixed top-[680px] grid grid-cols-4 gap-24 items-center justify-center text-white
               background w-full ">
                <div className="text-center">1</div>
                <div className="text-center">2</div>
                <div className="text-center">3</div>
                <div className="text-center">4</div>
              </div>
              </div>
        </>
    )
}