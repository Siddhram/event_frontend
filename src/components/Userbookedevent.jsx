import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userbookedevents } from '../redux/features/eventSlice';
import { Link, useNavigate } from 'react-router-dom';
import checkCookieToken from '../cheakcookie';

const Userbookedevent = () => {
    const dispatch=useDispatch();
    const nav=useNavigate()
  if (!checkCookieToken("token")) {
    nav("/sign-in")
    return;
  }
    useEffect(()=>{
      dispatch(userbookedevents());
    },[]);
    const userevents=useSelector((state)=>state.eventSlice.userbookedevents)||[];
    const orig=userevents.filter((each)=>each.userId==JSON.parse(localStorage.getItem('user'))._id)
      
    if(orig.length==0){
        return <div className="">no events.......</div>
    }
  return (
    <div className="">
  <section class="py-10 bg-gray-50 sm:py-16 lg:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-gray-800 sm:text-4xl">User Booked All events </h2>
        </div>

        <div class="grid grid-cols-1 mt-12 lg:mt-24 gap-y-12 md:grid-cols-3 gap-x-6">
            {orig.map((each)=>(<Link to={`/${each.eventbooked._id}`}>
             <div class="md:px-4 lg:px-10">
                <img class="-rotate-1" src={`${each.eventbooked.images[0]}`} alt="" />
                
                 <div className="mt-5">
<span class=" text-2xl font-bold leading-tight text-black">Event Name  :  </span>   
<span class=" text-xl font-semibold leading-tight text-black">{each.eventbooked.eventname}</span>   

                </div>
                <div className="mt-2">
<span class=" text-xl font-bold leading-tight text-black">Event Ticket  :  </span>   
<span class=" text-xl font-semibold leading-tight text-black">{each.ticket}</span>   

                </div>
                                {/* <h3 class="mt-5 text-xl font-bold leading-tight text-black">{each.ticket}</h3> */}
              <div className="mt-1">
                                <p class="mt-4 text-base text-gray-600">Place : {each.eventbooked.eventplace}</p>
              </div>
   <div className="mt-1">
                                <p class="mt-4 text-base text-gray-600">Food-Management : {each.eventbooked.foodmanagement}</p>
              </div>   <div className="mt-1">
                                <p class="mt-4 text-base text-gray-600">Book-Lastdate : {each.eventbooked.booklastdate}</p>
              </div>   <div className="mt-1">
                                <p class="mt-4 text-base text-gray-600">Remaning tickets : {each.eventbooked.totalbooking-each.eventbooked.alreadybooked}</p>
              </div>
            </div></Link>))}
           

        

            
        </div>
    </div>
</section>

    </div>
  )
}

export default Userbookedevent