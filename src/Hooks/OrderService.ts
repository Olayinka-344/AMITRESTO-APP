import {
    emailjs,
    EMAILJS_SERVICE_ID,
    EMAILJS_ORDER_TEMPLATE_ID,
    EMAILJS_CONFIRMATION_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY,
} from "../email";

interface CustomerInfo {
    name: string;
    phone: string;
    email: string;
    address: string;
}

export async function placeOrder(cartItems: any[], customer: CustomerInfo) {
    const orders = cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        units: item.quantity,
    }));

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );
    const orderId = Date.now().toString();
    
    try {
        const orderResponse = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_ORDER_TEMPLATE_ID,
            {
                buyer_name: customer.name,
                buyer_email: customer.email,
                buyer_phone: customer.phone,
                delivery_address: customer.address,
                orders: orders,
                cost: { total: total },
            },
            EMAILJS_PUBLIC_KEY
        );

        console.log("Order email sent:", orderResponse);
        console.log("customer object:", customer);
        console.log("customer.email specifically:", customer.email);
        
        const confirmationResponse = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_CONFIRMATION_TEMPLATE_ID,
            {
                buyer_name: customer.name,
                email: customer.email,
                order_id: orderId,
                delivery_address: customer.address,
                orders: orders,
                cost: { shipping: 0, tax: 0, total: total },
            },
            EMAILJS_PUBLIC_KEY
        );

        console.log("Confirmation email sent:", confirmationResponse);
        
    }
    catch (error) {
        console.error(" Sending order email failed:", error);
        throw error;
    }

    
}