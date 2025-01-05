import axios from 'axios'
import React, { useEffect, useState } from 'react'
import frontendurl from '../url';
import { useNavigate } from 'react-router-dom';
import checkCookieToken from '../cheakcookie';

const IssueAdmin = () => {
    const [data,setdata]=useState([]);
      const nav=useNavigate();
//     if (!checkCookieToken("admintoken")) {
//     nav('/')
//   return;
// }
    const func=async ()=>{
        const res=await axios.get(`${frontendurl()}message/getallissues`,{
            withCredentials:true
        });
       return res;
    }
    const dele=async (userdata)=>{
      const res=await axios.post(`${frontendurl()}message/delete/${userdata._id}`,userdata);
      return res;
    }
   
   
    const call=()=>{
func().then((res)=>{
            console.log(res.data.data);
            setdata(res.data.data);
        })
    }
    useEffect(()=>{

      if (!checkCookieToken("admintoken")) {
    nav('/admin/sign-in')
  return;
}
        call();
    },[]);
     const call2=(userdata)=>{
        dele(userdata).then((res)=>{
            console.log(res.data);
            call();
        })
    }
    if(data.length==0){
        return <div className="">no issues</div>
    }
  return (
    <div>
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">All The Issues </h2>
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600"></p>
        </div>
        <div className=" flex ">
            {data && data.map((each)=>(
              <div
  className="mt-4 ml-5 relative block overflow-hidden rounded-lg bg-gray-100 border border-gray-100 p-4 sm:p-6 lg:p-8  w-1/3"
>
  {/* <span
    className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
  ></span> */}

  <div className="sm:flex sm:justify-between sm:gap-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
        {each.subject}
      </h3>

      <p className="mt-1 text-xs font-medium text-gray-600">By {each.useremail}</p>
    </div>

    <div className="hidden sm:block sm:shrink-0">
      
    </div>
  </div>

  <div className="mt-4">
    <p className="text-pretty text-sm text-gray-500">
      {each.message}
    </p>
  </div>
  <button onClick={()=>{
    call2({
        _id:each._id,
        useremail:each.useremail,
        subject:each.subject,
        message:each.message
    })
        }}
          className=" mt-3 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
          type="button"
        >
         Visited
        </button>
</div>

        ))}
        </div>
        
      
    </div>
  )
}

export default IssueAdmin