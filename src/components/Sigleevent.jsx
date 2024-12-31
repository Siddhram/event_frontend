import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import Carousel from './Carousel';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { bookevent, bookeventzero } from '../redux/features/eventSlice';
const stripePromise = loadStripe('pk_test_51QEukkLBvhDT0PxxvAhPvkdUr3qJB8EE2JKBJvHnooYtysH018lh8I89iAYcUgdC3RCY5L6wPGjAGTGjBBFDAffc00RGdRDs5d');

const PaymentForm = ({ amount,ticket, id,email}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const dispatch=useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create payment intent from backend
      const response = await fetch('http://localhost:3000/event/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({eventId:id, tickets:1 }), // Amount in paise (₹100.00 = 1000 paise)
      });
   const r=await response.json()
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
        console.log('Payment Successful:', paymentIntent);
            setPaymentStatus(`Payment successful! Cheakout the mail of ${email} to see your tickets`);
        dispatch(bookevent({eventbooked:id,ticket:ticket,email:email}))
      }
    } catch (err) {
      console.error('Error:', err);
        // setPaymentStatus(`Payment failed. Please try again. ${err.message}`);
    }
  };
//   if((amount)==0){
//     return <div className="">
//          <button onClick={()=>{
//             setPaymentStatus(`Payment successful! Cheakout the mail of ${email} to see your tickets`);
//         dispatch(bookeventzero({eventbooked:id,ticket:ticket,email:email}))
//          }} class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-md focus:outline-none hover:bg-orange-600 focus:bg-orange-600">
//           Book with money ₹{(amount / 100)}
//            {/* Amount in INR */}
//         </button>
//               {paymentStatus && <p className="status-message">{paymentStatus}</p>}

//     </div>
//   }

  return (
    <div className="">
                                            <label for="" class="text-base font-medium text-gray-900"> Stripe Payment </label>

      <form className='' onSubmit={handleSubmit}>
        <div  class="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 caret-orange-500 my-3">
          <CardElement options={{ hidePostalCode: true, placeholder: 'Enter card details' }} />
        </div>
        <button type="submit" disabled={!stripe}  class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-md focus:outline-none hover:bg-orange-600 focus:bg-orange-600">
          Pay ₹{(amount *ticket)} {/* Amount in INR */}
        </button>
      </form>
      {paymentStatus && <p className="status-message">{paymentStatus}</p>}
    </div>
  );
};
const Sigleevent = () => {
    const {id}=useParams();
    const allevents=useSelector((state)=>state.eventSlice.allevents);
    const singlearray=allevents.filter((each)=>each._id==id);
    const perticularevent=singlearray[0];
    const [ticket,setticket]=useState(0);
        const [email,setemail]=useState(0);

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
                    <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:leading-tight lg:text-5xl">{perticularevent.eventname}</h2>
                    <p class="max-w-xl mx-auto mt-4 text-base leading-relaxed text-white">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
                 
                    {/* <img class="relative z-10 max-w-xs mx-auto -mb-16 md:hidden" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line-mobile.svg" alt="" />

                    <img class="hidden w-full translate-x-24 translate-y-8 md:block" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line.svg" alt="" /> */}
                </div>
  <div className=" py-5">
    <Carousel></Carousel>
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
                        <p class="text-lg leading-relaxed text-white">You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change and click save.</p>
                    </blockquote>

                    <div class="flex items-center mt-8">
                        <img class="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/avatar.jpg" alt="" />
                        <div class="ml-4">
                            <p class="text-base font-semibold text-white">Jenny Wilson</p>
                            <p class="mt-px text-sm text-gray-400">Product Designer</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="lg:pl-12 py-28">
                <div class="overflow-hidden bg-white rounded-md">
                    <div class="p-6 sm:p-10">
                        <h3 class="text-3xl font-semibold text-black">Get a free quote</h3>
                        <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.</p>

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
                                    {/* <button type="submit" class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-orange-500 border border-transparent rounded-md focus:outline-none hover:bg-orange-600 focus:bg-orange-600">
                                        Book the event
                                    </button> */}
                                     <Elements stripe={stripePromise}>
      <PaymentForm amount={perticularevent.price} ticket={ticket} id={id}  email={email} /> {/* Amount in paise (₹100.00) */}
    </Elements>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="md:hidden">
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
            </div>
        </div>
    </div>
</section>
         </div>
  )
}

export default Sigleevent