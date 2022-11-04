export default function Button({ children, className, ...props }) {
  return (
    <button
      type="button"
      className={`group relative py-2 px-3 text-sm font-medium rounded-md text-white outline-none bg-sky-500 focus:outline-sky-500 hover:brightness-110 disabled:brightness-75 hover:cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
