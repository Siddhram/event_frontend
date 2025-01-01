import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventBookeduserallevents, getAllEvents } from '../redux/features/eventSlice';
import { Link, useNavigate } from 'react-router-dom';
import checkCookieToken from '../cheakcookie';
import Signin from './Signin';

const AfterSignin = () => {
    const dispach=useDispatch();
    const allevents=useSelector((state)=>state.eventSlice.allevents);
      const getall= ()=>{        
        dispach(getAllEvents());
        dispach(eventBookeduserallevents());
    }
    // useMemo(()=>{
        
    // })
    useEffect(()=>{
getall();

    },[]);
const nav=useNavigate()
  if (!checkCookieToken("token")) {
    nav("/sign-in")
    return;
  }
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
            <img class=" mt-5 object-cover w-32 h-32 mx-auto rounded-full" src="https://media.licdn.com/dms/image/v2/D4D03AQE5ufZYKW5V1g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1696580075435?e=1741219200&v=beta&t=y6k2cdBUuCEe5-egBmwIAxHlVMHYMqT9KuPdDAJT_BU" alt="" />
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Attending events gives you a fresh perspective on life, ideas, and your goals.</p>
        </div>

        <div class="grid max-w-md grid-cols-1 mx-auto mt-12 lg:max-w-full lg:mt-16 lg:grid-cols-3 gap-x-16 gap-y-12">
          { allevents && allevents.map((each)=>(
            <div>
            <Link to={`/${each._id}`} > <a href="#" title="" class="block aspect-w-4 aspect-h-3">
                    <img class="object-cover w-full h-full" src={each.images[0]} alt="" />
                </a>
                <span class="inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full text-rose-500 bg-rose-100 mt-9"> {each.category} </span>
                <p class="mt-6 text-xl font-semibold">
                    <a href="#" title="" class="text-black"> {each.eventname} </a>
                </p>
                <p class="mt-4 text-gray-600">{each.dis}.</p>
                <div class="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                <span class="block text-sm font-bold tracking-widest text-gray-500 uppercase">Last Date {each.booklastdate}, {new Date().getFullYear()} </span>
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
  )
}

export default AfterSignin