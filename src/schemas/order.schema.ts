import { z } from "zod";
import { positiveNumberField, stringField } from "./global.schema";

export const makeOrderSchema = z.object({
    order_date: stringField("Order Date").optional().nullable(),
    customer_id: positiveNumberField("Customer ID").optional().nullable(),
    address: positiveNumberField("Address").optional().nullable(),
    reciever_name: stringField("Receiver Name").min(1, "Receiver name is required"),
    address_type: z.enum(["home", "office", "others"], { required_error: "Address type is required" }),
    province_id: stringField("Province ID"),
    city_id: stringField("City ID"),
    area_id: stringField("Area ID"),
    location: stringField("Location").min(1, "Location is required"),
    phone_number: stringField("Phone Number").min(10, "Phone number must be at least 10 digits"),
    email: stringField("Email").email("Invalid email format"),
    payment_type: z.enum(["online", "cash", "mixed", "others"], { required_error: "Payment type is required" }),
    payment_status: z.enum(["unpaid", "paid", "partially_paid"], { required_error: "Payment status is required" }),
    total_quantity: positiveNumberField("Total Quantity").min(1),
    total_amount: positiveNumberField("Total Amount").min(0),
    total_discount: positiveNumberField("Total Discount").min(0),
    shipping_price: positiveNumberField("Shipping Price").min(0).optional().nullable(),
    grand_total: positiveNumberField("Grand Total").min(0),
    items: z.array(z.object({
        id: positiveNumberField("Product ID"),
        name: stringField("Product Name"),
        rate: positiveNumberField("Product Rate"),
        quantity: positiveNumberField("Product Quantity"),
        amount: positiveNumberField("Amount"),
        discount: positiveNumberField("Discount"),
        total: positiveNumberField("Total"),
    })),
    coupon_code: stringField("Coupon Code").optional().nullable(),
    coupon_discount: positiveNumberField("Coupon Discount").min(0).optional().nullable(),
});

export type TMakeOrder = z.infer<typeof makeOrderSchema>;

export const couponCheckSchema = z.object({
    total_quantity: positiveNumberField("Total Quantity").min(1),
    cart_total: positiveNumberField("Cart Total").min(0),
    items: z.array(z.object({
        id: positiveNumberField("Product ID"),
        name: stringField("Product Name"),
        rate: positiveNumberField("Product Rate"),
        quantity: positiveNumberField("Product Quantity"),
        amount: positiveNumberField("Amount"),
        discount: positiveNumberField("Discount"),
        total: positiveNumberField("Total"),
    })),
    coupon_code: stringField("Coupon Code").optional(),
    shipping_price: positiveNumberField("Shipping Price")

});

export type TCouponCheck = z.infer<typeof couponCheckSchema>;

export const couponResponseSchema = z.object({
    message: stringField("Message").optional(),
    shipping_price: positiveNumberField("Shipping Price"),
    discount: positiveNumberField("Discount"),
    new_total: positiveNumberField("New Total"),
    updated_items: z.array(z.object({
        id: positiveNumberField("Product ID"),
        rate: positiveNumberField("Product Rate"),
        quantity: positiveNumberField("Product Quantity"),
        discount: positiveNumberField("Discount"),
        total: positiveNumberField("Total")
    })),
});

export type TCouponResponse = z.infer<typeof couponResponseSchema>;


export const orderSchema = z.object({
    id: positiveNumberField("Order ID"),
    order_date: stringField("Order Date"),
    total_items: positiveNumberField("Total Items"),
    total_price: stringField("Total Price"),
    discount: stringField("Discount"),
    shipping_price: stringField("Shipping Price"),
    grand_total: stringField("Grand Total"),
    coupon_code: stringField("Coupon Code").nullable(),
    payment_type: stringField("Payment Type"),
    payment_status: stringField("Payment Status"),
    status: stringField("Order Status"),
    area: z.object({
        id: positiveNumberField("Area ID"),
        name: stringField("Area Name"),
        shipping_price: stringField("Area Shipping Price"),
    }),
    city: z.object({
        id: positiveNumberField("City ID"),
        name: stringField("City Name"),
    }),
    province: z.object({
        id: positiveNumberField("Province ID"),
        name: stringField("Province Name"),
    }),
    address: z.object({
        type: stringField("Address Type"),
        location: stringField("Address Location"),
        phone_number: stringField("Phone Number"),
    }),
    shipping_address: stringField("Shipping Address"),
    cancellable: z.boolean(),
});

export type TOrder = z.infer<typeof orderSchema>;



export const orderItemSchema = z.object({
    order_id: positiveNumberField("Order ID"),
    product: z.object({
        id: positiveNumberField("Product ID"),
        name: stringField("Product Name"),
        slug: stringField("Product Slug"),
        alt_text: stringField("Product Alt Text"),
        description: stringField("Product Description"),
        brand_id: positiveNumberField("Brand ID"),
        price: stringField("Product Price"),
        status: stringField("Product Status"),
        created_at: stringField("Product Created At"),
        updated_at: stringField("Product Updated At"),
        images: z.array(
            z.object({
                id: positiveNumberField("Image ID"),
                product_id: positiveNumberField("Product ID"),
                image: stringField("Image"),
                image_order: positiveNumberField("Image Order"),
                is_primary: z.boolean(),
                created_at: stringField("Image Created At"),
                updated_at: stringField("Image Updated At"),
            })
        ),
    }),
    primary_image: stringField("Primary Image"),
    coupon_code: stringField("Coupon Code").nullable(),
    shipping_price: stringField("Shipping Price").nullable(),
    quantity: positiveNumberField("Quantity"),
    price: stringField("Item Price"),
    discount: stringField("Discount"),
    review: stringField("Review Status"),
});

export type TOrderItem = z.infer<typeof orderItemSchema>;

