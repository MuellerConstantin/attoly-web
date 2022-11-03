export default function Footer() {
  return (
    <div className="text-center bg-orange-500 text-gray-800 dark:text-white">
      <div className="text-center p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
        Made with&nbsp;
        <span className="text-red-500">&#x2764;</span>
        &nbsp;by&nbsp;
        <a
          className="text-sky-500 font-semibold hover:brightness-110 hover:underline"
          href="https://github.com/0x1c1b"
          target="_blank"
          rel="noreferrer"
        >
          0x1C1B
        </a>
      </div>
    </div>
  );
}
