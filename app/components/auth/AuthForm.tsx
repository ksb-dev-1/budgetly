import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";

interface ValidationErrors {
  [key: string]: string;
}

function AuthForm() {
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get("mode");

  const navigation = useNavigation();
  const validationErrors = useActionData<ValidationErrors | undefined>();

  const modeText = authMode === "register" ? "Register" : "Login";
  const toggleLinkCaption = authMode === "register" ? "Login" : "Register";
  const question =
    authMode === "register"
      ? "Already have an account? "
      : "Don't have an account? ";

  const isAuthenticating = navigation.state === "submitting";

  return (
    <div className="w-full">
      <Form method="post" className="border border-tertiary p-8 w-full mt-4">
        <h1 className="font-bold text-2xl text-secondary">{modeText}</h1>

        <p className="flex flex-col mt-6">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 px-3 py-2 border border-tertiary bg-primary focus:border-trasparent focus:outline-none"
          />
        </p>

        <p className="flex flex-col mt-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={6}
            className="mt-1 px-3 py-2 border border-tertiary bg-primary focus:border-trasparent focus:outline-none"
          />
        </p>

        {validationErrors && (
          <ul>
            {Object.values(validationErrors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        <div className="flex flex-col">
          <button
            disabled={isAuthenticating}
            className="bg-secondary text-primary font-semibold hover:bg-amber-300 transition-colors w-fit my-4 px-4 py-2"
          >
            {isAuthenticating ? "Authenticating..." : modeText}
          </button>

          <Link to={authMode === "register" ? "?mode=login" : "?mode=register"}>
            <span>{question}</span>
            <span className="text-secondary">{toggleLinkCaption}</span>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default AuthForm;
