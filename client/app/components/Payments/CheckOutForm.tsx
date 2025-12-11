import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'

type Props = {
    setOpen: any,
    data: any,
    user?: any
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
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(false);
            createOrder({ courseId: data._id, payment_info: paymentIntent });
        }
    };

    useEffect(() => {
        if (orderData) {
            setLoadUser(true);
            setOpen(false);
        }
        if (orderError && 'data' in orderError) {
             const errorData = orderError.data as any;
             setMessage(errorData.message);
        }
    }, [orderData, orderError, setOpen]);

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="w-full">
            <div className="w-full flex pb-2 border-b border-[#0000001c] dark:border-[#ffffff1c] mb-4">
                <h2 className="text-[14px] font-[600] font-Poppins text-black dark:text-white">
                    Secure Checkout
                </h2>
            </div>

            <div className="my-4">
                <PaymentElement id="payment-element" />
            </div>

            {message && (
                <div id="payment-message" className="flex items-center justify-center p-2 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                   <span className="font-medium mr-1">Error:</span> {message}
                </div>
            )}

            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className={`w-full h-[40px] flex items-center justify-center rounded-[8px] font-Poppins font-[600] text-white text-[16px] shadow-lg transition-all duration-300
                    ${isLoading || !stripe || !elements
                        ? "bg-gray-400 cursor-not-allowed opacity-70"
                        : "bg-gradient-to-r from-[#00A9E0] to-[#007EA7] hover:from-[#007EA7] hover:to-[#005570] cursor-pointer hover:shadow-xl hover:-translate-y-[1px]"
                    }`}
            >
                <span id="button-text">
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                             Processing...
                        </div>
                    ) : (
                        `Pay Now $${data?.price}`
                    )}
                </span>
            </button>
            
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-3 text-center font-Poppins opacity-80">
                Secured by Stripe
            </p>
        </form>
    );
};

export default CheckOutForm