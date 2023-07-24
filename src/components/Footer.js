import Link from "next/link"
import Image from "next/image"
import Home from '/public/images/home.png'
import Heart from '/public/images/myinfo.png'
import Add from '/public/images/addinfo.png'
import Profile from '/public/images/profile.png'
import { useRef, useState } from "react"

export default function Footer(){

    return(
        <>
             <div className="fixed bottom-0 grid grid-cols-4 gap-18 items-center justify-between text-white background w-full z[100] h-16 ">
                <div className = "flex justify-center items-center">
                {/* <div className = "w-16 h-16 bg-orange-300 rounded-[50px] fixed "></div> */}
                  <Link href="home" className="z-[100]">
                    <Image src={Home} width={30} height={30} alt="img"/>
                    </Link>
                  </div>
                <div className="flex justify-center items-center"><Link href="healthStatus"><Image src={Heart} width={30} height={30} alt = "img1"/></Link></div>
                <div className="flex justify-center items-center"><Link href="reportStatus"><Image src={Add} width={30} height={30} alt = "img2"/></Link></div>
                <div className="flex justify-center items-center"><Link href="addFamilyMember"><Image src={Profile} width={30} height={30} alt = "img3"/></Link></div>
              </div>
        </>
    )
}