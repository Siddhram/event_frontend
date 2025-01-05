import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventBookeduserallevents, getAllEvents } from '../redux/features/eventSlice';
import {  Link, useNavigate } from 'react-router-dom';
import checkCookieToken from '../cheakcookie';
import AdminSignin from './AdminSignin';
import Card from '../components/Card';
import IssueAdmin from './IssueAdmin';
const Adminpage = () => {
       const dispach=useDispatch();
       const nav=useNavigate()
    const allevents=useSelector((state)=>state.eventSlice.allevents);
      const getall= ()=>{
         console.log();
         
        dispach(getAllEvents());
        // dispach(eventBookeduserallevents());
    }
    // useMemo(()=>{
        
    // })
    useEffect(()=>{
        if (!checkCookieToken("admintoken")) {
    nav('/admin/sign-in')
  return;
}
getall();

    },[]);

const move=()=>{
    nav("/admin/create");
}
const movetoweb=()=>{
        nav("/");
}
  return (
    <div>
        {/* <AfterSignin></AfterSignin> */}
         <div>
        <section class="py-10 bg-white sm:py-16 lg:py-10">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">All The Events </h2>
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Clicek the Event To see the All the User Ticket.</p>
        </div>

        <div class="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-x-16 gap-y-12">
          { allevents && allevents.map((each)=>(
            <div>
            <Link to={`/admin/${each._id}`} > <Card image={each.images[0]} category={each.category} eventname={each.eventname} date={each.booklastdate} dis={each.dis}> </Card>
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

    </div>
 {/* <button className="m-2 p-2 ml-10 rounded-md bg-red-600 text-white" onClick={()=>{
         move();
      }}>Create event</button> */}
<header className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Want to create New events </h1>

        <p className="mt-1.5 text-sm text-gray-500">
          click here and create your events and connect the peoples
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="inline-flex items-center justify-center gap-1.5 rounded border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:outline-none focus:ring"
          type="button"
        >
          <button className="text-sm font-medium" onClick={()=>{
            movetoweb()
          }} > View Website </button>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>

        <button onClick={()=>{
                     move();
        }}
          className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
          type="button"
        >
          Create Post
        </button>
        <button onClick={()=>{
                    nav("/admin/issue")
        }}
          className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
          type="button"
        >
         See All issues
        </button>
      </div>
    </div>
  </div>
</header>
    </div>
  )
}

export default Adminpage