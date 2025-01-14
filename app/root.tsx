import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  //useMatches,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/x-icon", href: "/b-letter.svg" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  //const matches = useMatches();
  // const disableJS = matches.some(
  //   (match) => (match.handle as { disableJS?: boolean })?.disableJS
  // );

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        {/* {!disableJS && <Scripts />} */}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex justify-center pt-[9rem] pb-[4.5rem]">
      <div className="max-w-5xl w-full px-8">
        <Outlet />
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="border-2 border-red-600 rounded-xl px-8 py-4 bg-red-50 text-red-600">
          {error.status} : {error.statusText}
        </p>
        <Link
          to="/"
          className="text-secondary mt-4 hover:text-amber-300 transition-colors"
        >
          Back to safety
        </Link>
      </div>
    );
  }

  const errorMessage = error instanceof Error ? error.message : "Unknown error";

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1>Something went wrong!</h1>
      <p>{errorMessage}</p>
      <Link
        to="/"
        className="text-secondary mt-4 hover:text-amber-300 transition-colors"
      >
        Back to safety
      </Link>
    </div>
  );
}
