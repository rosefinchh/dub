import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useMemo } from "react";

const TabsHelper = (router: NextRouter): { name: string; href: string }[] => {
  const { slug, key } = router.query as {
    slug?: string;
    key?: string;
  };
  if (key) {
    return [{ name: "← All Links", href: `/${slug || "links"}` }];
  } else if (slug) {
    return [
      { name: "Links", href: `/${slug}` },
      { name: "Settings", href: `/${slug}/settings` },
    ];
  }
  return [
    { name: "Projects", href: `/` },
    { name: "Dub.sh Links", href: `/links` },
    { name: "Settings", href: `/settings` },
  ];
};

export default function NavTabs() {
  const router = useRouter();
  const tabs = useMemo(() => {
    if (!router.isReady) {
      return [];
    } else {
      return TabsHelper(router);
    }
  }, [router.query]);

  return (
    <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
      {tabs.map(({ name, href }) => (
        <Link key={href} href={href}>
          <a
            className={`border-b-2 p-1 ${
              router.asPath.split("?")[0] === href
                ? "border-black text-black"
                : "border-transparent text-gray-600 hover:text-black"
            }`}
          >
            <div className="rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
              <p className="text-sm">{name}</p>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
