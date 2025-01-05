import React from 'react';

const UserBookComponent = ({image,eventname,ticket,eventplace,foodmanagement,booklastdate,Remaning}) => {
  return (
     <div class="w-80  rounded  shadow-lg">
  <img class="w-full h-40 object-cover" src={image} alt="Sunset in the mountains"></img>
  <div className="px-6 py-4    ">
   <div>
  <div class="font-bold text-xl mb-2 text-left">Name: {eventname}</div>
  <p class="text-gray-700 text-base text-left">
    Place: {eventplace}
  </p>
  <p class="text-gray-700 text-base text-left">
    Food-Management: {foodmanagement}
  </p>
  <p class="text-gray-700 text-base text-left">
    Book-Lastdate: {booklastdate}
  </p>
  <p class="text-gray-700 text-base text-left">
    Remaining tickets: {Remaning}
  </p>
</div>

  </div>
  <div class=" px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">tickets : {ticket}</span>
    
  </div>
  {/* Last Date {date}, {new Date().getFullYear()}  */}
</div>

  );
};

export default UserBookComponent;
