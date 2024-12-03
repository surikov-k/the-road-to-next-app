import { MyBig } from "@/lib/big";

export function toCurrencyFromCents(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(fromCent(amount));
}

export function toCent(amount: number) {
  return new MyBig(amount).mul(100).round(2).toNumber();
}

export function fromCent(amount: number) {
  return new MyBig(amount).div(100).round(2).toNumber();
}
