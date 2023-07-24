import Image from "next/image"

// import logo from "/public/favicon.ico"

import logo from "/public/images/image_scanning_finding_searching.gif"


export default function Header(){

    // let image = JSON.parse(logo)

    // console.log(image);

    return (
        <>
                <div className="flex top-0 fixed justify-center items-center  background w-full z-[100]" >
                    <h2 className="capitalize text-white">mybio backup</h2>
                    <Image src={logo} width={50} height ={50} alt="scanner" className="relative left-20 " ></Image>
                </div>

                </>)
}