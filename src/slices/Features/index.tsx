import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Calendar from "@/components/Calendar";
import Bargraph from "@/components/Bargraph";
import Clover from "@/components/Clover";
import Hourglass from "@/components/Hourglass";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md"  className="text-center mb-12">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm"  className="sm:text-left text-center mt-7 mb-7 font-medium">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-base font-medium font-body text-slate-600 sm:text-left text-center">{children}</p>
  )
}

const icons = {
  calendar: <Calendar />,
  bargraph: <Bargraph />,
  clover: <Clover />,
  hourglass: <Hourglass />
};

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

/**
 * Component for "Features" Slices.
 */
const Features: FC<FeaturesProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading}
        components={components}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 max-w-5xl gap-x-8 gap-y-12 mx-auto
        sm:place-items-start place-items-center">
      {slice.primary.feature_list.map((item, index) => (
        <div key={index} className="max-w-xs grid sm:place-items-start place-items-center">
          {item.icon && (
            <div className="mb-5">{icons[item.icon]}</div>
          )}
          <PrismicRichText field={item.title}
            components={components}
          />
          <PrismicRichText field={item.description}
            components={components}
          />
        </div>
      ))}
      </div>
    </Bounded>
  );
};

export default Features;
