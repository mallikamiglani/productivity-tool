'use client'
import Image from "next/image"
import logo from "@/images/productivity-tool-logo.png"
import {MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/solid"
import Avatar from "react-avatar"

function Header() {
  return (
    <header>
        <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
            {/* Gradient background */}
            <div
                className="
                absolute
                top-0
                left-0
                w-full
                h-3/4
                bg-gradient-to-br
                from-pink-600/90
                to-[#0399DE]
                filter
                blur-3xl
                opacity-50
                -z-50
                "
                >

            </div>
            {/* Logo on left */}
            <Image
                src = {logo}
                alt = "Tool logo"
                priority = {true}
                className = "w-44 md:w-50 pb-5 md:pb-0 object-contain"
            />
            {/* Right side */}
            <div className = "flex items-center space-x-5 flex-1 justify-end w-full">
                {/* Search bar */}
                <form className = "flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-400"></MagnifyingGlassIcon>
                    <input type = "text" placeholder = "Search" className = "flex-1 outline-none p-2"/>
                    <button type = "submit" hidden> Search </button>
                </form>
                {/* Profile pic */}
                <Avatar name = "Jane Doe" round size = "50" color = "#0399DE"/>
            </div>
        </div>
        <div className = "flex items-center justify-center py-2 md:py-5 px-5">
            <p className = "flex items-center p-2 bg-white pr-5 shadow-xl rounded-xl w-fit font-light text-sm italic max-w-3xl text-[#0399DE]">
                <UserCircleIcon className = "h-10 w-10 mr-1" color = "#0399DE"/>
                GPT summary here!
            </p>
        </div>
    </header>
  )
}

export default Header