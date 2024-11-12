export default function TextArea({
  onChange,
  onBlur,
  value,
  label,
  error,
  touched,
  className,
  ...props
}) {
  return (
    <>
      {label && <p className="mb-1 text-sm">{label}</p>}
      <textarea
        className={`relative bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-300 placeholder-gray-400 border ${
          error && touched
            ? "border-red-500"
            : "border-gray-300 dark:border-gray-500"
        } block w-full px-3 py-2 rounded-md focus:outline-none focus:outline-sky-500 disabled:brightness-75 ${className}`}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        {...props}
      />
      {error && touched && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </>
  );
}
