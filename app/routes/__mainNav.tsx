import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

// components
import MainNav from "~/components/navigation/MainNav";
import { getUserFromSession } from "~/lib/auth.server";

export default function MainNavLayout() {
  return (
    <>
      <MainNav />
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
