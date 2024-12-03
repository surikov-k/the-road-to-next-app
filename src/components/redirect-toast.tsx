"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { deleteCookie, getCookie } from "@/actions/cookies";

export default function RedirectToast() {
  const pathname = usePathname();
  useEffect(() => {
    async function showToast() {
      const message = await getCookie("toast");
      if (message) {
        toast.success(message);
        await deleteCookie("toast");
      }
    }
    showToast();
  }, [pathname]);
  return null;
}
