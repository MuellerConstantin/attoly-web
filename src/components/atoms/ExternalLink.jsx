export default function Link({ children, type, className, ...props }) {
  if (type === "button") {
    return (
      <a
        className={`block group relative py-2 px-3 text-sm font-medium rounded-md text-white outline-none bg-sky-500 focus:outline-sky-500 hover:brightness-110 disabled:brightness-75 hover:cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      className={`text-sky-500 hover:brightness-110 hover:underline hover:cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
