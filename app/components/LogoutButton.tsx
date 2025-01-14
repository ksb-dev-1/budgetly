import { Form } from "@remix-run/react";

export default function LogoutButton({
  toggleMenu,
  mainNav,
}: {
  toggleMenu?: () => void;
  mainNav?: boolean;
}) {
  return (
    <Form
      method="post"
      action={mainNav ? "/logout" : "logout"}
      onClick={toggleMenu}
      className="w-full"
    >
      <button className="w-full font-medium bg-secondary px-4 py-2 hover:bg-amber-300 text-primary transition-colors">
        Logout
      </button>
    </Form>
  );
}
