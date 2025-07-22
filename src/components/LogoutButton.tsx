import clsx from "clsx";

type LogoutButtonProps = {
  className?: string,
}

export default function LogoutButton({
  className,
  ...restProps
}: LogoutButtonProps) {
  const handleLogout = async () => {
    await fetch("/api/logout"); // clears cookie + redirects
    window.location.href = "/login";
  };

  return (
    <button onClick={handleLogout} className={clsx(className)}
      {...restProps}>
      Logout
    </button>
  );
}
