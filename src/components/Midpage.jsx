import React from 'react'
import { useSelector } from 'react-redux'

const Midpage = ({array,freeevents}) => {
   
  return (
    <div>
     
<div class="flex-wrap items-center justify-evenly gap-8 text-center sm:flex">
    <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
        <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div>
        </div>
        <h3 class="py-1 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            Total Events
        </h3>
         <h3 class=" text-xl font-semibold text-gray-700 sm:text-xl dark:text-white">
           {array}
        </h3>
        <p class="py-2 text-gray-500 text-md dark:text-gray-300">
            the total events for the this month is the {array} make shure that you are booked the Ticket 
        </p>
    </div>
    {/* <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-beforelg sm:w-1/2 md:w-1/2 lg:w-1/4 sm:mt-16 md:mt-20 lg:mt-24 dark:bg-gray-800">
        <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div>
        </div>
        <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            Branding
        </h3>
        <p class="py-4 text-gray-500 text-md dark:text-gray-300">
            Share relevant, engaging, and inspirational brand messages to create a connection with your audience.
        </p>
    </div> */}
    <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
        <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div>
        </div>
        <h3 class="py-1 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            Free Events
        </h3>
        <h3 class=" text-xl font-semibold text-gray-700 sm:text-xl dark:text-white">
           {freeevents}
        </h3>
        <p class="py-2 text-gray-500 text-md dark:text-gray-300">
            the total events for the this month is the {freeevents} make shure that you are booked the Ticket 
        </p>
    </div>
</div>

    </div>
  )
}

export default Midpage