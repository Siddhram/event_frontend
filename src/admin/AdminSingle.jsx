import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { delete_event, getallbookedeventsmem } from '../redux/adminredux/adminSlice';
import { useNavigate, useParams } from 'react-router-dom';
import checkCookieToken from '../cheakcookie';
import AdminSignin from './AdminSignin';
import axios from 'axios';

const AdminSingle = () => {
    const {id}=useParams();
    
    const dispatch=useDispatch();
    const array=useSelector((state)=>state.adminSlice.alleventbookedmember)
    const [adhar,setadhar]=useState('');
    useEffect(()=>{
        dispatch(getallbookedeventsmem());
    },[array])
    const nav=useNavigate()

    if (!checkCookieToken("admintoken")) {
        nav('/admin/sign-in')
  return;
}

let ev=array.filter((each)=>each.eventbooked==id);
        let myeventbook=array.filter((each)=>each.eventbooked==id).filter((each)=>((each.adharcardno+"").includes(adhar+"")&&each.adharcardno!=0))||[];
            // useEffect(()=>{
            //     const array=myeventbook.filter((each)=>(each.adharcardno+"").startsWith(adhar+""));
            //     myeventbook=array;
            //     console.log(array);
                
            // },[adhar])

if(ev.length==0){
    return (
        <div className=" justify-items-center align-middle">
            No User Booked Ticket For This event
        </div>
    )
}
const sendmail=async ()=>{
    const res=await axios.post('http://localhost:3000/event/admin/mail',{userId:JSON.parse(localStorage.getItem('user')),eventbooked:id},{
        withCredentials:true
    })
    console.log(res.data);
}
  return (
        
        <section class=" sm:py-16 lg:py-2">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-1xl lg:text-2xlxl">This Event Booked by {myeventbook.length} Users</h2>
         
        </div>
             <input type="number"
                 class="block max-w-screen-md px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
             value={adhar} onChange={(e)=>setadhar(e.target.value)} name="" id="" placeholder='Aadhaar Card No' />
        <div class="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
           {myeventbook && myeventbook.map((each,i)=>(
            <div className="">
              <div key={i} class="overflow-hidden bg-black rounded-md">
                <div class="px-5 py-6">
                    <div class="flex items-center justify-between">
                        <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-2.jpg" alt="" />
                        <div class="min-w-0 ml-3 mr-auto">
                            <p class="text-base font-semibold text-white truncate">{each.userId.username}</p>
                            <p class="text-sm text-gray-400 truncate">{each.adharcardno}</p>
                        </div>
                        <a href="#" title="" class="inline-block text-sky-500">
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <blockquote class="mt-5">
                        <p class="text-base text-gray-300">
                           {each.userId.username} is Comming With his  {each.ticket}  more Friends to Enjoy this Event 
                            <span class="block text-sky-500">                          Tickets  :  {each.ticket}
</span>
                        </p>
                    </blockquote>
                </div>
            </div>
            
<button onClick={()=>{
    sendmail().then(()=>{
    dispatch(delete_event({_id:each._id}));
    })
    
}} type="button" className="my-2 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
Accept
<span class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
{each.ticket}
</span>  
</button>

            </div>
           ))}


           
        </div>
    </div>
     
</section>
  )
}

export default AdminSingle