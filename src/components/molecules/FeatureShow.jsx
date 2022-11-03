import {
  DevicePhoneMobileIcon,
  CurrencyEuroIcon,
  CogIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Easy Link Management",
    description:
      "An easy-to-use application to manage all your shortcuts and content. You are in control of everything down to the smallest detail.",
    icon: CogIcon,
  },
  {
    name: "Generate QR-Codes",
    description:
      "In addition to a short link, you can also conveniently generate a QR code that can be shared around the world and linked directly to your content.",
    icon: QrCodeIcon,
  },
  {
    name: "Device Compatibility",
    description:
      "Our service works across devices. Thanks to our responsive-first approach, this applies in particular to our management portal and our website.",
    icon: DevicePhoneMobileIcon,
  },
  {
    name: "Fair prices",
    description:
      "Thanks to our open source approach, we can achieve extremely cheap and fair prices. A large part of our services even remains completely free.",
    icon: CurrencyEuroIcon,
  },
];

export default function FeatureShow() {
  return (
    <div className="py-12 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight sm:text-4xl">
            A better way to short links
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Create short links in seconds and share them across all the
            platforms you use. See what we offer you:
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-sky-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg font-medium leading-6">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
