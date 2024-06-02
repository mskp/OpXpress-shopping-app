"use server";

import { MAX_CART_ITEM_QUANTITY } from "@/config/consts";
import { prisma } from "@/config/prisma.config";
import { revalidatePath } from "next/cache";

export async function addToCart(userId: string, productId: string) {
  try {
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId,
        productId,
      },
    });

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + 1;
      if (newQuantity > MAX_CART_ITEM_QUANTITY) {
        throw new Error(`Quantity cannot exceed ${MAX_CART_ITEM_QUANTITY}`);
      }

      await prisma.cart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: newQuantity,
        },
      });
    } else {
      await prisma.cart.create({
        data: {
          userId,
          productId,
          quantity: 1,
        },
      });
    }

    revalidatePath(`/cart/${userId}`);
    return true;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return false;
  }
}

export async function increaseQuantity(userId: string, productId: string) {
  try {
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId,
        productId,
      },
    });

    if (!existingCartItem) {
      throw new Error("Cart item does not exist.");
    }

    const newQuantity = existingCartItem.quantity + 1;
    if (newQuantity > MAX_CART_ITEM_QUANTITY) {
      throw new Error(`Quantity cannot exceed ${MAX_CART_ITEM_QUANTITY}`);
    }

    await prisma.cart.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: newQuantity,
      },
    });

    revalidatePath(`/cart/${userId}`);
    return true;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return false;
  }
}

export async function decreaseQuantity(userId: string, productId: string) {
  try {
    const existingCartItem = await prisma.cart.findUnique({
      where: {
        userId,
        productId,
      },
    });

    if (!existingCartItem) {
      throw new Error("Cart item does not exist.");
    }

    const newQuantity = existingCartItem.quantity - 1;
    if (newQuantity <= 0) {
      await prisma.cart.delete({
        where: {
          id: existingCartItem.id,
        },
      });
    } else {
      await prisma.cart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: newQuantity,
        },
      });
    }

    revalidatePath(`/cart/${userId}`);
    return true;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return false;
  }
}

export async function deleteFromCart(userId: string, productId: string) {
  try {
    await prisma.cart.delete({
      where: {
        userId,
        productId,
      },
    });

    revalidatePath(`/cart/${userId}`);
    return true;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return false;
  }
}

export async function checkout(
  userId: string,
  checkoutDetails: {
    fullname: string;
    phone: string;
    address: string;
    pincode: string;
    city: string;
  }
) {
  try {
    // Retrieve cart items for the user
    const cartItems = await prisma.cart.findMany({
      where: {
        userId,
      },
    });

    if (cartItems.length === 0) {
      throw new Error("Cart is empty.");
    }

    // Create orders for each cart item
    for (const cartItem of cartItems) {
      // First, create the OrderInfo
      const orderInfo = await prisma.orderInfo.create({
        data: {
          fullname: checkoutDetails.fullname,
          phone: checkoutDetails.phone,
          address: checkoutDetails.address,
          pincode: checkoutDetails.pincode,
          city: checkoutDetails.city,
        },
      });

      // Then, create the Order and link it to the OrderInfo
      await prisma.order.create({
        data: {
          userId,
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          orderInfoId: orderInfo.id,
        },
      });
    }

    // Clear the user's cart
    await prisma.cart.deleteMany({
      where: {
        userId,
      },
    });

    revalidatePath(`/cart/${userId}`);
    revalidatePath(`/order/${userId}`);
    return true;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    return false;
  }
}

export async function clearCart(userId: string) {
  try {
    await prisma.cart.deleteMany({
      where: {
        userId,
      },
    });

    // Revalidate the cart page
    revalidatePath(`/cart/${userId}`);
  } catch (error) {
    return false;
  }
}
