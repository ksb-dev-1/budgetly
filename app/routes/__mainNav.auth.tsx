import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// components
import AuthForm from "~/components/auth/AuthForm";
import { CustomError, login, signup } from "~/lib/auth.server";
import { validateCredentials } from "~/lib/validation.server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const meta: MetaFunction = ({ data }: { data: any }) => {
  const mode = data?.mode || "login";
  const title = mode === "login" ? "Login" : "Register";
  return [
    { title },
    { name: "description", content: `Welcome to budgetly! Please ${mode}.` },
  ];
};

export default function AuthenticationPage() {
  return <AuthForm />;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode") || "login";
  return { mode };
}

export async function action({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData) as Record<
    string,
    FormDataEntryValue
  >;

  // Ensure credentials match the expected type
  const typedCredentials = {
    email: credentials.email?.toString() || "",
    password: credentials.password?.toString() || "",
  };

  try {
    validateCredentials(typedCredentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login(typedCredentials);
    } else {
      return await signup(typedCredentials);
    }
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.status === 422) {
        return { credentials: error.message };
      }
    }
  }
}
