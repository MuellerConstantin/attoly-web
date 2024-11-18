import { useTranslation } from "react-i18next";
import {
  DevicePhoneMobileIcon,
  CurrencyEuroIcon,
  CogIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";

export default function FeatureShow() {
  const { t } = useTranslation();

  const features = [
    {
      name: t("components.feature-show.features.managament.title"),
      description: t("components.feature-show.features.managament.description"),
      icon: CogIcon,
    },
    {
      name: t("components.feature-show.features.qrcode.title"),
      description: t("components.feature-show.features.qrcode.description"),
      icon: QrCodeIcon,
    },
    {
      name: t("components.feature-show.features.compatibility.title"),
      description: t(
        "components.feature-show.features.compatibility.description"
      ),
      icon: DevicePhoneMobileIcon,
    },
    {
      name: t("components.feature-show.features.prices.title"),
      description: t("components.feature-show.features.prices.description"),
      icon: CurrencyEuroIcon,
    },
  ];

  return (
    <div className="py-12 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight sm:text-4xl">
            {t("components.feature-show.title")}
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
            {t("components.feature-show.description")}
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
                <dd className="mt-2 ml-16 text-base text-gray-400">
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
