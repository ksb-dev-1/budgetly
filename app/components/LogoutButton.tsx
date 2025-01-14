import { Form } from "@remix-run/react";

export default function LogoutButton({
  toggleMenu,
  pricing,
}: {
  toggleMenu?: () => void;
  pricing?: boolean;
}) {
  return (
    <Form
      method="post"
      action={pricing ? "/logout" : "logout"}
      onClick={toggleMenu}
    >
      <button className="font-medium bg-secondary px-4 py-2 hover:bg-amber-300 text-primary transition-colors">
        Logout
      </button>
    </Form>
  );
}
