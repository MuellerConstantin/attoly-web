/* eslint-disable jsx-a11y/anchor-is-valid */
export default function InfoBanner() {
  return (
    <div className="bg-orange-500 text-white dark:text-gray-800">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Attention, Excavators! &#128736;
          </h2>
          <p className="lg:w-1/2">
            This site and the associated services are originally a pure learning
            project. The construction of our platform is therefore not yet final
            and is progressing steadily.
          </p>
        </div>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="https://github.com/0x1c1b"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white dark:bg-gray-800 px-5 py-3 text-base font-medium text-sky-500 hover:brightness-110"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
