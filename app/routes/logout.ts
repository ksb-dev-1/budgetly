import { ActionFunctionArgs } from "@remix-run/node";
import { destroyUserSession } from "~/lib/auth.server";

export function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw new Response("Invalid request method", { status: 400 });
  }

  return destroyUserSession(request);
}
