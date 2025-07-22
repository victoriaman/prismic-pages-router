import { FC, useEffect, useState } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { CONSTANT } from "@/lib/constant";
import { apiPost } from "@/lib/api";
import { LoginRequest } from "@/model/LoginRequest";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="sm" className="font-semibold text-center mb-4">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-center text-slate-600 mb-8">{children}</p>
  ),
};

/**
 * Props for `Login`.
 */
export type LoginProps = SliceComponentProps<Content.LoginSlice>;

/**
 * Component for "Login" Slices.
 */
const Login: FC<LoginProps> = ({ slice }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false); // ✅ Track client-side render

  useEffect(() => {
    setIsClient(true); // ✅ Prevent SSR from running client-only logic
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // TODO: Replace with actual API call
      const isValid = await apiPost<LoginRequest>("/auth/login", {
        email,
        password,
      });

      if (isValid) {
        document.cookie = `${CONSTANT.AUTHENTICATION_COOKIE_NAME}=true; path=/;`;
        router.push("/about"); // ✅ Redirect after login
      } else {
        setError("Username or password is incorrect");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "❌ Login failed");
    }
  };

  if (!isClient) return null; // ✅ Avoid SSR error

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl m-auto shadow-xl md:px-12 px-4 py-12 place-items-center 
        rounded-lg bg-gradient-to-tr from-cyan-50 via-white to-emerald-50">
          <PrismicNextImage field={slice.primary.image} className="rounded-lg" />

          <div className="grid gap-4">
            <PrismicRichText field={slice.primary.heading} components={components} />

            <Button field={slice.primary.logingooglebutton}>
              {slice.primary.logingooglebuttontext}
            </Button>

            <Button field={slice.primary.logintwitterbutton}>
              {slice.primary.logintwitterbuttontext}
            </Button>

            <PrismicRichText field={slice.primary.separator} components={components} />

            <label htmlFor="email" className="text-slate-600">
              {slice.primary.usernamelabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded"
            />

            <label htmlFor="password" className="text-slate-600">
              {slice.primary.passwordlabel}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded"
            />

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <PrismicNextLink field={slice.primary.forgetpasswordlink} className="underline text-right">
              {slice.primary.forgetpasswordtext}
            </PrismicNextLink>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {slice.primary.signinbuttontext}
            </button>

            <div className="flex">
              <p>{slice.primary.nothaveaccounttext}</p>
              <p className="pl-1 underline">{slice.primary.signuptext}</p>
            </div>
          </div>
        </div>
      </form>
    </Bounded>
  );
};

export default Login;
