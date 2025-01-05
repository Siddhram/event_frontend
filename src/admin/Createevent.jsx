import axios from "axios";
import { useEffect, useState } from "react"
import checkCookieToken from "../cheakcookie";
import { useNavigate } from "react-router-dom";
import frontendurl from "../url";

const Createevent = () => {
    const nav=useNavigate();
    if (!checkCookieToken("admintoken")) {
    nav('/admin/sign-in')
  return;
}
    const [category,setcategory]=useState('');
        const [EventName,setEventName]=useState('');
    const [EventPlace,setEventPlace]=useState('');
    const [Booklastdate,setBooklastdate]=useState(0);
    const [Price,setPrice]=useState(0);
        const [TotalBooking,setTotalBooking]=useState(0);
                const [Image,setImage]=useState('');
                const [Imagearray,setImagearray]=useState([]);
             const [mess,setmess]=useState('');
                          const [dis,setdis]=useState('');

const handelbackedcall=async()=>{
    try {
        const res=await axios.post(`${frontendurl()}event/create-event`,{
       category: category,
            eventname: EventName,
            eventplace: EventPlace,
            images: Imagearray,
            price: Price,
            foodmanagement: "Free refreshments provided",
            totalbooking: TotalBooking,
            alreadybooked: 0,
            booklastdate: Booklastdate,
            dis: dis,
  },{
    withCredentials:true
  })
  console.log(res.data);
  setmess(res.data.message);
   nav('/admin')
    } catch (error) {
        setmess("error please cheak details")
    }
  
}

useEffect(()=>{
      const array=Image.split(",");
      const fil=array.map((each)=>each.trim())
      setImagearray(fil)
      

},[Image]);    
  return (
    <div>
      
        <div class="m-4 block max-w-screen-sm px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                >
<label htmlFor="user-type-dropdown"

>Select Category:</label>
      <select
        id="user-type-dropdown"
        class="m-4 block max-w-screen-sm px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
        value={category}
        onChange={(e)=>setcategory(e.target.value)}
        
      >
        <option value=""   disabled>
          Select an option
        </option>
        <option value="friends">friends</option>
        <option value="education">education</option>
                <option value="children">children</option>
        <option value="charity">charity</option>

      </select> 
                </div>
      <div className="">
              <input
              class="m-4 block max-w-screen-md px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
              type="text" onChange={(e)=>setEventName(e.target.value)} placeholder="EventName" name="" id="" />

      </div>
      <div className="">
                      <input
                      class="m-4 block max-w-screen-md px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                      type="text" onChange={(e)=>setEventPlace(e.target.value)} placeholder="EventPlace" name="" id="" />
      </div>
       <div className="">
                      <input
                      class="m-4 block max-w-screen-md px-4 py-8 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                      type="text" onChange={(e)=>setImage(e.target.value)} placeholder="Images plese add quama after image link" name="" id="" />
      </div>
       <div className="">
                      <input
                      class="m-4 block max-w-screen-md px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                      type="number" onChange={(e)=>setBooklastdate(e.target.value)} placeholder="Booklastdate" name="" id="" />
      </div>

            <div className="">
                      <input
                      class="m-4 block max-w-screen-md px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                      type="number" onChange={(e)=>setPrice(e.target.value)} placeholder="Price" name="" id="" />
      </div>
       <div className="">
                      <input
                      class="m-4 block max-w-screen-md px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                
                      type="number" onChange={(e)=>setTotalBooking(e.target.value)} placeholder="TotalBooking" name="" id="" />
      </div>
       <div className="">
                      <input
                      class="m-4 block max-w-screen-md px-4 py-8 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                
                      type="text" onChange={(e)=>setdis(e.target.value)} placeholder="Discription" name="" id="" />
      </div>
      <button className="m-2 p-2 rounded-md bg-red-600 text-white" onClick={()=>{
         handelbackedcall();
      }}>Create event</button>

      <div className="">
        {mess}
      </div>
         </div>
  )
}

export default Createevent