import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
// PaymentElement ko import karna zaroori hai
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'

type Props = {
    setOpen: any,
    data: any
}

const CheckOutForm = ({ setOpen, data }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<any>("");
    const [createOrder, { data: orderData, error: orderError }] = useCreateOrderMutation();
    const [loadUser, setLoadUser] = useState(false);
    const { } = useLoadUserQuery({ skip: loadUser ? false : true });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setIsLoading(true);
        // Stripe payment confirm karna
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false);
            // Agar payment successful hai, to backend par order create karein
            createOrder({ courseId: data._id, payment_info: paymentIntent });
        }
    };

    // Order safalta-poorvak banne ke baad kya karna hai
    useEffect(() => {
        if (orderData) {
            setLoadUser(true); // User data refresh karein taaki naya course dikhe
            setOpen(false);    // Modal band karein
            // Yahan aap ek success toast/alert bhi dikha sakte hain
        }
        if (orderError && 'data' in orderError) {
             const errorData = orderError.data as any;
             setMessage(errorData.message);
        }
    }, [orderData, orderError, setOpen]);


    // --- Yahan se Form ka UI shuru hota hai ---
    return (
        <form id="payment-form" onSubmit={handleSubmit} className="w-full">
            <h2 className="text-[20px] font-[600] font-Poppins text-black dark:text-white pb-4">
                Pay securely with Stripe
            </h2>

            {/* Stripe ka bana banaya UI element card details ke liye */}
            <div className="my-4">
                <PaymentElement id="payment-element" />
            </div>

            {/* Agar koi error ho to yahan dikhayein */}
            {message && (
                <div id="payment-message" className="text-red-500 text-[16px] font-Poppins pt-2">
                    {message}
                </div>
            )}

            {/* Submit button */}
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={`w-full mt-6 h-[45px] flex items-center justify-center rounded-[8px] font-Poppins font-[600] text-white transition-all duration-300
                    ${isLoading || !stripe || !elements
                        ? "bg-gray-400 cursor-not-allowed" // Loading ke dauran button disabled
                        : "bg-[#37a39a] hover:bg-[#2e8880] cursor-pointer" // Normal state
                    }`}
            >
                <span id="button-text">
                    {isLoading ? (
                        // Chota sa loading spinner text
                        "Processing Payment..."
                    ) : (
                        // Price ke sath Pay button
                        `Pay Now $${data?.price}`
                    )}
                </span>
            </button>
        </form>
    );

};

export default CheckOutForm