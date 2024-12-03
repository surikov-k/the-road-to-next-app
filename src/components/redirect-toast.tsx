"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { deleteCookie, getCookie } from "@/actions/cookies";

export default function RedirectToast() {
  useEffect(() => {
    async function showToast() {
      const message = await getCookie("toast");
      if (message) {
        toast.success(message);
        await deleteCookie("toast");
      }
    }
    showToast();
  }, []);
  return null;
}
