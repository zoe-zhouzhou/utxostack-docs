import { redirect } from "next/navigation";

export const metadata = {};

export default function Home() {
  redirect("/en");
}
