import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Carousel from './Carousel';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { bookevent, bookeventzero } from '../redux/features/eventSlice';
import checkCookieToken from '../cheakcookie';
const stripePromise = loadStripe('pk_test_51QEukkLBvhDT0PxxvAhPvkdUr3qJB8EE2JKBJvHnooYtysH018lh8I89iAYcUgdC3RCY5L6wPGjAGTGjBBFDAffc00RGdRDs5d');

const PaymentForm = ({ amount,ticket, id,email,rem,adharcardno}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState('fill details');
  const dispatch=useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
if (email.length==0||ticket==0||(adharcardno+"").length!=12) {
                            setPaymentStatus(`Pleasefill from`);
return;
            }
    try {
      // Create payment intent from backend
                      console.log("ticket ",ticket);

      const response = await fetch('http://localhost:3000/event/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({eventId:id, tickets:ticket }), // Amount in paise (₹100.00 = 1000 paise)
      });
//   if (email.length==0||ticket==0||(adharcardno+"").length!=12) {
//                             setPaymentStatus(`Pleasefill from`);
// return;
//             }
   const r=await response.json()
   if(r.status==404){
        setPaymentStatus(`plese login and try`);
   }
console.log(r);

        setPaymentStatus(`${r.message}`);

      const { clientSecret } = r;

      // Confirm card payment
   
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      
      if (error) {
        console.error('Payment Error:', r.message);
        setPaymentStatus(`Payment failed. Please try again. ${r.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        // console.log('Payment Successful:', paymentIntent);
            // setPaymentStatus(`Payment successful! Cheakout the mail of ${email} to see your tickets`);
          
            // else{
                
        dispatch(bookevent({eventbooked:id,ticket:ticket,email:email,adharcardno}))
setPaymentStatus(`Payment successful! Cheakout the mail of ${email} to see your tickets`);
            // }
      }
    } catch (err) {
      console.error('Error:', err);
        // setPaymentStatus(`Payment failed. Please try again. ${err.message}`);
    }
  };
  if((amount)==0){
    return <div className="">
         <button onClick={()=>{
            // setPaymentStatus(`Payment successful! Cheakout the mail of ${email} to see your tickets`);
            if (email.length==0||ticket==0||(adharcardno+"").length!=12) {
                            setPaymentStatus(`Pleasefill from`);

            }
            else{
        dispatch(bookeventzero({eventbooked:id,ticket:ticket,email:email,adharcardno}))
setPaymentStatus(`Payment successful! Cheakout the mail of ${email} to see your tickets`);
            }
         }} class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-md focus:outline-none hover:bg-orange-600 focus:bg-orange-600">
          Book with money ₹{(amount / 100)}
           {/* Amount in INR */}
        </button>
              {paymentStatus && <p className="status-message">{paymentStatus}</p>}

    </div>
  }
// console.log(rem);

  return (
    <div className="">
                                            <label for="" class="text-base font-medium text-gray-900"> Stripe Payment </label>

      <form className='' onSubmit={handleSubmit}>
        <div  class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500 my-3">
          <CardElement options={{ hidePostalCode: true, placeholder: 'Enter card details' }} />
        </div>
        {rem==0?(<div className="">
            <button  class="my-3 inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-md focus:outline-none hover:bg-orange-600 focus:bg-orange-600">
         All Tickets are Sold-Out {/* Amount in INR */}
        </button>
        </div>):( <div className="">
             <div  class="my-3 inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-md focus:outline-none hover:bg-orange-600 focus:bg-orange-600">
          Ammount ₹{(amount *1)} {/* Amount in INR */}
        </div>
        <button type="submit" disabled={!stripe}  class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-md focus:outline-none hover:bg-orange-600 focus:bg-orange-600">
          Pay ₹{(amount *ticket)} {/* Amount in INR */}
        </button>
        </div>)}
       
         
      </form>
      {paymentStatus && <p className="status-message">{paymentStatus}</p>}
    </div>
  );
};
const Sigleevent = () => {
    const {id}=useParams();
    const allevents=useSelector((state)=>state.eventSlice.allevents);
    const eventbookeduser=useSelector((state)=>state.eventSlice.eachproductbooked)||[];
    const myeventbook=eventbookeduser.filter((each)=>each.eventbooked==id);
    const singlearray=allevents.filter((each)=>each._id==id);
    const perticularevent=singlearray[0];
    const [ticket,setticket]=useState(0);
        const [adharcardno,setadharcardno]=useState(0);

        const [email,setemail]=useState(0);
const nav=useNavigate()
  if (!checkCookieToken("token")) {
    nav("/sign-in")
    return;
  }
    if (allevents.length==0) {
        return <div>
            loding........
        </div>
    }

  return (
    <div>
        <section class="py-10 bg-gray-900 sm:py-16 lg:py-10">
    <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:items-stretch md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
            <div class="flex flex-col justify-between lg:py-5">
                <div>
                    <h2 class=" text-3xl font-bold leading-tight text-white sm:text-4xl lg:leading-tight lg:text-5xl">{perticularevent.eventname}</h2>
                                   <p class="font-bold max-w-xl mx-auto mt-4 text-base leading-relaxed text-white">Food-Management : <span className=' font-semibold'>{perticularevent.foodmanagement}</span></p>
                 
                    {/* <img class="relative z-10 max-w-xs mx-auto -mb-16 md:hidden" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line-mobile.svg" alt="" />

                    <img class="hidden w-full translate-x-24 translate-y-8 md:block" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line.svg" alt="" /> */}
                </div>
  <div className=" py-5">
    <Carousel imgs={perticularevent.images}></Carousel>
</div>


                <div class="hidden md:mt-auto md:block">
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                        <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                            />
                        </svg>
                    </div>

                    <blockquote class="mt-6">
                        <p class="text-lg leading-relaxed text-white">{perticularevent.dis}.</p>
                    </blockquote>

                    <div class="flex items-center mt-8">
                              <div class="ml-4">
                            <p class="text-base font-semibold text-white">Remaning Tickets </p>
                            <p class="mt-px text-sm text-gray-400">{perticularevent.totalbooking-perticularevent.alreadybooked}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:pl-12 py-28">
                <div class="overflow-hidden bg-white rounded-md">
                    <div class="p-6 sm:p-10">
                        <h3 class="text-3xl font-semibold text-black">Book the Event Now</h3>
                        <p class="mt-4 text-base text-gray-600">
                            Fill the details properly.</p>

                        <div   class="mt-4">
                            <div class="space-y-6">
                                <div>
                                    <label for="" class="text-base font-medium text-gray-900"> Email </label>
                                    <div class="mt-2.5 relative">
                                        <input
                                            type="email"
                                            name=""
                                            id=""
                                            onChange={(e)=>setemail(e.target.value)}
                                            placeholder="Enter Email"
                                            class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                                        />
                                    </div>
                                </div>

                                {/* <div>
                                    <label for="" class="text-base font-medium text-gray-900"> Email address </label>
                                    <div class="mt-2.5 relative">
                                        <input
                                            type="text"
                                            name=""
                                            id=""
                                            placeholder="Enter your full name"
                                            class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
                                        />
                                    </div> 
                                </div>
*/}
                                <div>
                                    <label for="F" class="text-base font-medium text-gray-900"> Number of Tickets </label>
                                    <div class="mt-2.5 relative">
                                        <input
    type="number"
    name=""
    id=""
    onChange={(e)=>setticket(e.target.value)}
    placeholder="Number of tickets"
    class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
    min="0"
/>

                                    </div>
                                </div>
<div>
                                    <label for="F" class="text-base font-medium text-gray-900"> Aadhaar Card No </label>
                                    <div class="mt-2.5 relative">
                                        <input
    type="number"
    name=""
    id=""
    onChange={(e)=>setadharcardno(e.target.value)}
    placeholder="Adhar card number"
    class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500"
    min="000000000000"
/>

                                    </div>
                                </div>

                                <div>

                                    {/* <button type="submit" class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-md focus:outline-none hover:bg-orange-600 focus:bg-orange-600">
                                        Book the event
                                    </button> */}
                                     <Elements stripe={stripePromise}>
      <PaymentForm amount={perticularevent.price} ticket={ticket} id={id}  email={email} rem={perticularevent.totalbooking-perticularevent.alreadybooked} adharcardno={adharcardno} /> {/* Amount in paise (₹100.00) */}
    </Elements>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div class="md:hidden">
                <div class="flex items-center">
                    <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                    <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                    <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                    <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                    <svg class="w-6 h-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                </div>

                <blockquote class="mt-6">
                    <p class="text-lg leading-relaxed text-white">You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.</p>
                </blockquote>

                <div class="flex items-center mt-8">
                    <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/avatar.jpg" alt="" />
                    <div class="ml-4">
                        <p class="text-base font-semibold text-white">Jenny Wilson</p>
                        <p class="mt-px text-sm text-gray-400">Product Designer</p>
                    </div>
                </div>
            </div> */}
        </div>
    </div>

</section>
<section class="py-10  bg-gray-900 sm:py-16 lg:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Find your Friends</h2>
         
        </div>

        <div class="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
           {myeventbook && myeventbook.map((each)=>(
             <div class="overflow-hidden bg-white rounded-md">
                <div class="px-5 py-6">
                    <div class="flex items-center justify-between">
                        <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/7/avatar-2.jpg" alt="" />
                        <div class="min-w-0 ml-3 mr-auto">
                            <p class="text-base font-semibold text-black truncate">{each.userId.username}</p>
                            <p class="text-sm text-gray-600 truncate">{each.adharcardno}</p>
                        </div>
                        <a href="#" title="" class="inline-block text-sky-500">
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                    <blockquote class="mt-5">
                        <p class="text-base text-gray-800">
                            Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.
                            <span class="block text-sky-500">                          Tickets  :  {each.ticket}
</span>
                        </p>
                    </blockquote>
                </div>
            </div>

           ))}
           
        </div>
    </div>
</section>

         </div>
  )
}

export default Sigleevent