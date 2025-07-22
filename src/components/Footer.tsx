import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import Logo from "@/components/Logo";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
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
        <Bounded as="footer">
            <div className="flex sm:flex-row flex-col justify-between items-center gap-6">
                <Link href="/">
                    <Logo />
                </Link>
                
                <p className="text-xs">©{new Date().getFullYear()} {settings.data.site_title}</p>
                <nav>
                    <ul className="flex flex-row">
                        {settings.data.navigation.map(({ label, link }: any) => (
                            <li key={label}>
                            <PrismicNextLink field={link} className={`p-3 ${pathname === link.url ? 'text-green-300' : ''}`}>
                              {label}
                            </PrismicNextLink>
                          </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </Bounded>
    );
}