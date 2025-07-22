import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

import Bounded from "@/components/Bounded";
import Logo from "./Logo";
import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const [settings, setSettings] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchSettings = async () => {
      const client = createClient();
      const result = await client.getSingle("settings");
      setSettings(result);
    };

    fetchSettings();
  }, []);

  if (!settings) {
    return null; // or a loading spinner
  }

  return (
    <Bounded as="header" className="py-4 md:py-6 lg:py-8">
      <div className="flex gap-4 items-center justify-between sm:flex-row">
        <Link href="/">
          <Logo />
        </Link>
        <nav>
          <ul className="flex">
            {settings.data.navigation.map(({ label, link }: any) => (
              <li key={label}>
                <PrismicNextLink field={link} className={`p-3 ${pathname === link.url ? 'text-green-300' : ''}`}>
                  {label}
                </PrismicNextLink>
              </li>
            ))}
            <LogoutButton className="text-red-300 hover:text-red-700 cursor-pointer ml-2" />
          </ul>
        </nav>
      </div>
    </Bounded>
  );
}
