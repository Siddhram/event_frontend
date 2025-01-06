import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateuser } from '../redux/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import checkCookieToken from '../cheakcookie';

const UserProfile = () => {
    useEffect(()=>{
        if (!checkCookieToken("token")) {
    nav("/sign-in")
    return;
  }
    },[])
    /*
    username:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
      type:String,
    required:true,
},
contactNo:{
    type:String,
},
fullname:{
   type:String,
default:''
},
state:{
 type:String,
default:''
},
image:{
 type:String,
default:''
},
address:{
 type:String,
default:''
},
city:{
    type:String,
default:''
},
dis:{
          type:String,
default:''
  },

    */
       const mess=useSelector((state)=>state.userSlice.userData);

   const [username,setusername]=useState(mess?.username);
      const [contactNo,setcontactNo]=useState(mess?.contactNo);
      const [fullname,setfullname]=useState(mess?.fullname);
      const [state,setstate]=useState(mess?.state);
      const [address,setaddress]=useState(mess?.address);
      const [city,setcity]=useState(mess?.city);
      const [dis,setdis]=useState(mess?.dis);
      const [image,setimage]=useState(mess?.image)
    const dispatch=useDispatch(); 
    const nav=useNavigate();        
    const update=()=>{
        dispatch(updateuser({
          username,
          contactNo,
          fullname,
          state,
          address,
          city,
          image,
          dis
        }));
        nav("/");

    }
    const handel= (formdata)=>{
            const cloud_name="drxliiejo"
           axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formdata).then((res)=>{
             alert("Image uploaded successfully!");
            //  console.log(res.data.secure_url);
             setimage(res.data.secure_url);

            }).catch(()=>{
             alert("error");

            })
      
    }
    
  return (
    <div>

<section class="py-10 bg-gray-200 sm:py-16 lg:py-24">
    <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Your Profile </h2>
            <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-black">Edit Profile
Basic Information</p>
        </div>

        <div class="max-w-6xl mx-auto mt-12 overflow-hidden bg-white rounded-md shadow-md lg:mt-20">
            <div class="grid items-stretch grid-cols-1 lg:grid-cols-3">
                <div class="lg:col-span-3">
                    <div class="p-6 sm:p-10">
                        <h3 class="text-2xl font-semibold text-black">Your profile</h3>

                        <form action="" onSubmit={(e)=>{
                            e.preventDefault();
                             update();
                        }} method="POST" class="mt-8">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                                <div>
                                    <label for="" class="text-base font-medium text-gray-900"> Username </label>
                                    <div class="mt-2.5 relative">
                                        <input onChange={(e)=>setusername(e.target.value)} type="text" name="" id="" placeholder={username} class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label for="" class="text-base font-medium text-gray-900"> ContactNo </label>
                                    <div class="mt-2.5 relative">
                                        <input type="text" onChange={(e)=>setcontactNo(e.target.value)}  name="" id="" placeholder={contactNo} class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                                    </div>
                                </div>
                              
                              <div>
                                    <label for="" class="text-base font-medium text-gray-900"> image </label>
                                    <div class="mt-2.5 relative">
                                        <input type="file" onChange={(e)=>{
                                            // setimage(e.target.files[0]);
                                            const formdata=new FormData();
                                            formdata.append("file",e.target.files[0]);
                                            formdata.append("upload_preset","mycloud");
                                            handel(formdata);
                                        }}   name="" id="" placeholder="image" class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                                    </div>
 <div className="m-4 flex justify-start items-center">
      <img
        className="w-28 h-28 rounded-full object-cover"
        src={image}
        alt="User profile"
      />
    </div>                              </div>
                                <div>
                                    <label for="" class="text-base font-medium text-gray-900"> fullname </label>
                                    <div class="mt-2.5 relative">
                                        <input type="text" onChange={(e)=>setfullname(e.target.value)} name="" id="" placeholder={fullname} class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                                    </div>
                                </div>

                                <div>
                                    <label for="" class="text-base font-medium text-gray-900"> State </label>
                                    <div class="mt-2.5 relative">
                                        <input type="text" onChange={(e)=>setstate(e.target.value)} name="" id="" placeholder={state} class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                                    </div>
                                </div>

                                <div class="sm:col-span-2">
                                    <label for=""  class="text-base font-medium text-gray-900"> Address </label>
                                    <div class="mt-2.5 relative">
                                        <textarea
                                            name=""
                                            onChange={(e)=>setaddress(e.target.value)}
                                            id=""
                                            placeholder={address}
                                            class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md resize-y bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            rows="4"
                                        ></textarea>
                                    </div>
                                </div>
   <div>
                                    <label for="" class="text-base font-medium text-gray-900"> City </label>
                                    <div class="mt-2.5 relative">
                                        <input type="text" onChange={(e)=>setcity(e.target.value)} name="" id="" placeholder={city} class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                                    </div>
                                </div>
                                <div class="sm:col-span-2">
                                    <label for="" class="text-base font-medium text-gray-900"> Dis </label>
                                    <div class="mt-2.5 relative">
                                        <textarea
                                            name=""
                                            onChange={(e)=>setdis(e.target.value)}
                                            id=""
                                            placeholder={dis}
                                            class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md resize-y bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                            rows="4"
                                        ></textarea>
                                    </div>
                                </div>
                                <div class="sm:col-span-2">
                                    <button type='submit'  class="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">
                                        Save Changes
                                    </button>
                                </div>
                                {/* {mess} */}
                            </div>
                        </form>
                    </div>
                </div>

               
            </div>
        </div>
    </div>
</section>
    </div>
  )
}

export default UserProfile