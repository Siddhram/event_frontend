import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventBookeduserallevents, getAllEvents, userbookedevents } from '../redux/features/eventSlice';
import { Link, useNavigate } from 'react-router-dom';
import checkCookieToken from '../cheakcookie';
import Signin from './Signin';
import Midpage from './Midpage';
import Card from './Card';
import axios from 'axios';
import frontendurl from '../url';

const AfterSignin = () => {
    const dispach=useDispatch();
    const allevents=useSelector((state)=>state.eventSlice.allevents);
      const getall= ()=>{        
        dispach(getAllEvents());
        dispach(eventBookeduserallevents());
    }
    // useMemo(()=>{
        
    // })
    const [l,setl]=useState("0");
    useEffect(()=>{
getall();
          dispach(userbookedevents());
load().then((res)=>{
  // console.log(res.data.current.length);
  
 setl(res.data.current.length);
});
    },[]);
        const userbooked=useSelector((state)=>state.eventSlice.userbookedevents);
    const load=async ()=>{
      const res=await axios.get(`${frontendurl()}user/currentusers`,{withCredentials:true})
      // setl(res.data.length);
      return res;
    }
const nav=useNavigate()
  if (!checkCookieToken("token")) {
    nav("/sign-in")
    return;
  }
  const free=allevents.filter((each)=>each.price==0);
    // if (allevents.length==0) {
    //     return <div className="">
    //         loding...........
    //     </div>
    // }
  return (
    <div>
        <section class="py-10 bg-white sm:py-16 lg:py-10">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Explore Connect and Grow  </h2>
              <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Attending events gives you a fresh perspective on life, ideas, and your goals.</p>
        </div>
<Midpage array={allevents.length}
    freeevents={free.length}></Midpage>
    <div className="mt-8 flex justify-center align-middle">
      <button onClick={()=>{
        nav("/")
      }} type="button" class=" text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
All Events</button>
{/* <div className=" flex justify-evenly align-middle">
  <button type="button" class=" text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
Sort The event</button>
</div> */}

    </div>
     <button onClick={()=>{
      nav("/sort")
     }} type="button" class=" text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
Sort The event</button>
        <div class="grid max-w-md grid-cols-1 mx-auto mt-10 lg:max-w-full lg:mt-8 lg:grid-cols-3 gap-x-16 gap-y-12">
          
          { allevents && allevents.map((each,i)=>(
            <div>
            <Link key={i} to={`/${each._id}`} >                 <Card image={each.images[0]} category={each.category} eventname={each.eventname} date={each.booklastdate} dis={each.dis}> </Card>

                </Link>
            </div>
          )) }

            {/* <div>
                <a href="#" title="" class="block aspect-w-4 aspect-h-3">
                    <img class="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/1/blog-post-2.jpg" alt="" />
                </a>
                <span class="inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full text-sky-500 bg-sky-100 mt-9"> Marketing </span>
                <p class="mt-6 text-xl font-semibold">
                    <a href="#" title="" class="text-black"> 6 Product launching emails you want to use on next campaign. </a>
                </p>
                <p class="mt-4 text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                <div class="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                <span class="block text-sm font-bold tracking-widest text-gray-500 uppercase"> Martin Jones . June 12, 2021 </span>
            </div> */}

            {/* <div>
                <a href="#" title="" class="block aspect-w-4 aspect-h-3">
                    <img class="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/1/blog-post-3.jpg" alt="" />
                </a>
                <span class="inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full text-sky-500 bg-sky-100 mt-9"> Marketing </span>
                <p class="mt-6 text-xl font-semibold">
                    <a href="#" title="" class="text-black"> Learn from the best: 7 email marketing ideas you can use </a>
                </p>
                <p class="mt-4 text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                <div class="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                <span class="block text-sm font-bold tracking-widest text-gray-500 uppercase"> Martin Jones . June 12, 2021 </span>
            </div> */}
        </div>
    </div>
</section>

<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Your Trusted Ticket Booking Partner</h2>

<p className="mt-4 text-gray-500 sm:text-xl">
  From live concerts to blockbuster events, we connect you to unforgettable experiences. Join millions who trust us for fast, reliable, and hassle-free ticket bookings!
</p>


  </div>

  <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">Total Events</dt>

      <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{allevents.length}</dd>
    </div>

    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">Current Users Booking</dt>

      <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{userbooked.length}</dd>
    </div>

    <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
      <dt className="order-last text-lg font-medium text-gray-500">Total Users</dt>

      <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{l}</dd>
    </div>

   
  </dl>
</div>
    </div>
  )
}

export default AfterSignin