import { redirect } from "react-router";

export function loader() {
  return redirect("/en/");
}

export default function RedirectPage() {
  return null;
}
