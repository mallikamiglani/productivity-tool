import Image from "next/image"
import logo from "@/images/productivity-tool-logo.png"
import {MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/solid"

function Header() {
  return (
    <header>
        <div className = "flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
            {/* Logo on left */}
            <Image
                src = {logo}
                alt = "Tool logo"
                // width = {300}
                // height = {100}
                className = "w-44 md:w-56 pb-10 md:pb-0 object-contain"
            />

            <div className = "">
                {/* Search bar on right */}
                <form className = "flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-400"></MagnifyingGlassIcon>
                    <input type = "text" placeholder = "Search" className = "flex-1 outline-none p-2"/>
                    <button type = "submit" hidden> Search </button>
                </form>
            </div>
        </div>

    </header>
  )
}

export default Header