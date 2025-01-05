import React from 'react'
import '../App.css'
const Card = ({image,category,eventname,date,dis}) => {
  return (
    <div class="w-80 h-96 rounded overflow-hidden shadow-lg">
  <img class="w-full h-40 object-cover" src={image} alt="Sunset in the mountains"></img>
  <div className="px-6 py-4 h-32 overflow-hidden overflow-y-scroll scrollbar-none">
    <div class="font-bold text-xl mb-2">{eventname}</div>
    <p class="text-gray-700 text-base">
      {dis}
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{category}</span>
    
  </div>
  <div className="ml-4">
     Last Date <span className=' font-semibold'>{date}, {new Date().getFullYear()}</span>  
  </div>
</div>

  )
}

export default Card