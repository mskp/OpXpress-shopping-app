"use client";

import {
  deleteFromCart,
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
} from "@/actions/cart";
import { useAuth } from "@/lib/redux/features/auth/use-auth";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useAuthDialog } from "@/lib/redux/features/auth-dialog/use-auth-dialog";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { MAX_CART_ITEM_QUANTITY } from "@/config/consts";
import { useCheckoutDialog } from "@/lib/redux/features/checkout-dialog/use-checkout-dialog";

export function IncrementButton({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const { auth } = useAuth();
  function handleIncrementQuantity() {
    const userId = auth?.auth?.uid;
    if (auth?.isLoggedin && userId) {
      increaseQuantity(userId, productId);
    }
  }
  return (
    <Button
      variant={"outline"}
      disabled={quantity === MAX_CART_ITEM_QUANTITY}
      size={"icon"}
      className=" border border-gray-200"
    >
      <AiOutlinePlus onClick={handleIncrementQuantity} size={22} />
    </Button>
  );
}

export function DecrementButton({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const { auth } = useAuth();
  function handleDecrementQuantity() {
    const userId = auth?.auth?.uid;
    if (auth?.isLoggedin && userId) {
      decreaseQuantity(userId, productId);
    }
  }
  return (
    <Button
      size={"icon"}
      variant={quantity === 1 ? "destructive" : "outline"}
      className=" border-gray-200"
    >
      {quantity === 1 ? (
        <AiOutlineDelete onClick={handleDecrementQuantity} size={22} />
      ) : (
        <AiOutlineMinus onClick={handleDecrementQuantity} size={22} />
      )}
    </Button>
  );
}

export function DeleteFromCartButton({ productId }: { productId: string }) {
  const { auth } = useAuth();
  return (
    <Button
      onClick={() => {
        const userId = auth?.auth?.uid;
        if (auth?.isLoggedin && userId) {
          deleteFromCart(userId, productId);
        }
      }}
      size={"icon"}
      variant={"destructive"}
    >
      <AiOutlineDelete size={20} />
    </Button>
  );
}

export function AddToCartButton({
  productId,
  className,
  variant = "outline",
}: {
  productId: string;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}) {
  const { auth } = useAuth();
  const { setAuthDialog } = useAuthDialog();
  const router = useRouter();

  async function handleAddToCart() {
    if (auth?.isLoggedin && auth?.auth?.uid) {
      const added = await addToCart(auth?.auth?.uid, productId);
      if (added) {
        toast({
          title: "Added to cart",
        });
        return router.push(`/cart/${auth?.auth?.uid}`);
      } else {
        toast({
          title: "Failed adding to cart",
        });
      }
      return;
    }
    toast({
      title: "You must login first",
    });
    setAuthDialog(true, "login");
  }

  return (
    <Button onClick={handleAddToCart} variant={variant} className={className}>
      Add to bag
    </Button>
  );
}

export function CheckoutButton() {
  const { setCheckoutDialog } = useCheckoutDialog();

  return (
    <button
      onClick={() => setCheckoutDialog(true)}
      className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 "
    >
      Checkout
    </button>
  );
}

export function ClearCartButton() {
  const { auth } = useAuth();
  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        const userId = auth?.auth?.uid;
        if (auth?.isLoggedin && userId) {
          clearCart(userId);
        }
      }}
    >
      Clear Cart
    </Button>
  );
}
