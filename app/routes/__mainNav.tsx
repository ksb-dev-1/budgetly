import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

// lib
import { getUserFromSession } from "~/lib/auth.server";

// components
import MainNav from "~/components/navigation/MainNav";
import BottomMainNav from "~/components/navigation/BottomMainNav";

export default function MainNavLayout() {
  return (
    <>
      <MainNav />
      <BottomMainNav />
      <Outlet />
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await getUserFromSession(request);
}

// export function headers() {
//   return {
//     "Cache-Control": "max-age=3600", // 60 minutes
//   };
// }
