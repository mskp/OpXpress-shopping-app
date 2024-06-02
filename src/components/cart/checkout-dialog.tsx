"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCheckoutDialog } from "@/lib/redux/features/checkout-dialog/use-checkout-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "../ui/card";
import { checkout } from "@/actions/cart";
import { useAuth } from "@/lib/redux/features/auth/use-auth";
import { useRouter } from "next/navigation";

const checkoutSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(1, "Address is required"),
  pincode: z
    .string()
    .min(5, "Pincode must be at least 5 digits")
    .regex(/^\d+$/, "Pincode must contain only digits"),
  city: z.string().min(1, "City is required"),
});

type CheckoutSchema = z.infer<typeof checkoutSchema>;

export default function CheckoutDialog() {
  const router = useRouter();
  const { auth } = useAuth();
  const { setCheckoutDialog, checkoutDialog } = useCheckoutDialog();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
  });

  const handleAddToCart: () => void = handleSubmit(async (checkoutDetails) => {
    const ordered = await checkout(auth?.auth?.uid!, checkoutDetails);
    if (ordered) {
      setCheckoutDialog(false);
      router.push(`/order/${auth?.auth?.uid}`);
    }
  });

  if (!checkoutDialog.isOpen) return null;

  return (
    <Dialog open={true} onOpenChange={setCheckoutDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="space-y-1 text-center"></DialogHeader>
        <Card className="w-full max-w-md border-none rounded-lg">
          <CardContent>
            <form action={handleAddToCart} className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    placeholder="John Doe"
                    type="text"
                    {...register("fullname")}
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-sm">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="1234567890"
                    type="text"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    type="text"
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    placeholder="12345"
                    type="text"
                    {...register("pincode")}
                  />
                  {errors.pincode && (
                    <p className="text-red-500 text-sm">
                      {errors.pincode.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    type="text"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <Button
                  disabled={
                    Object.values(errors)?.length > 0 ||
                    Object.values(touchedFields)?.length === 0
                  }
                  className="w-full mt-4 rounded-full"
                  type="submit"
                >
                  Checkout
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
