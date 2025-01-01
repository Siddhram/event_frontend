import { useSelector } from "react-redux";
import UserShowNotSinin from "./components/UserShowNotSinin";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import checkCookieToken from "./cheakcookie";
export default function App() {
     const user=useSelector((state)=>state.userSlice?.userData?.username)||""
    useEffect(()=>{
        console.log(user);
        
    },[user])
  return (
    <>
     <header class="bg-[#FCF8F1] bg-opacity-30">
        <div class="px-4 mx-auto sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 lg:h-20">
                <div class="flex-shrink-0">
                    <a href="#" title="" class="flex">
                        <img class="w-32 h-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL1n22F_pH_NsGs1vEKFNVyUnz8VfpS4Z2Dw&s" alt="" />
                    </a>
                </div>

                <button type="button" class="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                    <svg class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                    </svg>

                    <svg class="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div class="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                    <Link to={'/friends'}>
                       <a href="" title="" class="text-base text-black transition-all duration-200 hover:text-opacity-80"> friends </a>
                    </Link>
                 <Link to={'/education'}>
                    <a href="" title="" class="text-base text-black transition-all duration-200 hover:text-opacity-80"> education </a></Link>
                                  <Link to={'/children'}>
                                   <a href="" title="" class="text-base text-black transition-all duration-200 hover:text-opacity-80"> children </a>
                                   </Link>
                 <Link to={'/charity'}>
                  <a href="" title="" class="text-base text-black transition-all duration-200 hover:text-opacity-80"> charity </a>
                 </Link>


                 

                   

                    
                </div>
                {checkCookieToken("token")?(<Link to={'/user'}>
                  <button  title="" class="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full" role="button"> {user} </button>
       </Link>):<div></div>}
                

                   </div>
        </div>
    </header>
     <UserShowNotSinin></UserShowNotSinin>
    </>
  )
}