import ExternalLink from "../atoms/ExternalLink";

export default function Footer() {
  return (
    <div className="text-center bg-orange-500 text-gray-800 dark:text-white">
      <div className="text-center p-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
        Made with&nbsp;
        <span className="text-red-500">&#x2764;</span>
        &nbsp;by&nbsp;
        <ExternalLink
          href="https://github.com/0x1c1b"
          target="_blank"
          rel="noreferrer"
          className="font-semibold"
        >
          0x1C1B
        </ExternalLink>
      </div>
    </div>
  );
}
