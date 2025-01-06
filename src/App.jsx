import { useSelector } from "react-redux";
import UserShowNotSinin from "./components/UserShowNotSinin";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import checkCookieToken from "./cheakcookie";
export default function App() {
     const user=useSelector((state)=>state.userSlice?.userData?.username)||""
     const image=useSelector((state)=>state.userSlice?.userData?.image)||""
    useEffect(()=>{
        // console.log(user);
        
    },[user])

    const nav=useNavigate();
  return (
    <>
     <header className="bg-[#FCF8F1] bg-opacity-30">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
                <div className="flex-shrink-0">
                    <a href="#" title="" className="flex">
                        <img className="w-32 h-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL1n22F_pH_NsGs1vEKFNVyUnz8VfpS4Z2Dw&s" alt="" />
                    </a>
                </div>
                

                <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                    <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                    </svg>

                    <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

              {checkCookieToken("token")?( <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                    <Link to={'/profile'}>
                       <a href="" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Profile </a>
                    </Link>
                 <Link to={'/contact'}>
                    <a href="" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Contact </a></Link>
                                  <Link to={'/sort'}>
                                   <a href="" title="" className="text-base text-black transition-all duration-200 hover:text-opacity-80"> Category </a>
                                   </Link>
                 


                 

                   

                    
                </div>):(
                     <div className=""></div>
                )} 
                {checkCookieToken("token")?(        <div className=" flex justify-center align-middle">
                       
                              <Link to={'/user'}>
                  <button  title="" className=" hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-black hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full" role="button"> Booked Events </button>
       </Link>
          <button onClick={()=>{
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // Cookies.remove("token");
            nav("/")
          }}  title="" className="ml-4 hidden lg:inline-flex items-center justify-center px-3 py-1.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-red-600 rounded-full" role="button">Logout </button>
           <Link to={'/profile'}>
                  <button  title=""  role="button"> 
                      <div className="">
                     <img
        className="ml-4 w-10 h-10 rounded-full object-cover"
        src={image?image:"https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhcnRvb258ZW58MHx8MHx8fDA%3D"}
        alt="User profile"
      />
                  </div> </button>
              
                 
       </Link>
        </div>
    ):<div></div>}
                

                   </div>
        </div>

    </header>
     <UserShowNotSinin></UserShowNotSinin>
    </>
  )
}