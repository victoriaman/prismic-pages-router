import dynamic from "next/dynamic";
import { Content } from "@prismicio/client";
import { components as allComponents } from "@/slices";
import React from "react";

// ✅ Load login slice ở client-only (dùng useRouter, useState, ...)
const LoginSliceClient = dynamic(() => import("@/slices/Login"), {
  ssr: false,
});

// ✅ Union tất cả slice types từ Prismic
type Slice =
  | Content.CallToActionSlice
  | Content.FeaturesSlice
  | Content.HeroSlice
  | Content.LoginSlice
  | Content.TestimonialsSlice
  | Content.TextWithImageSlice;

type Props = {
  slices: Slice[];
};

export default function RenderSlices({ slices }: Props) {
  return (
    <>
      {slices.map((slice, index) => {
        if (slice.slice_type === "login") {
          return (
            <LoginSliceClient
              key={index}
              slice={slice}
              index={index}
              slices={slices}
              context={undefined}
            />
          );
        }

        const SliceComponent =
          allComponents[slice.slice_type as keyof typeof allComponents] as React.ComponentType<any>;

        if (SliceComponent) {
          return (
            <SliceComponent
              key={index}
              slice={slice}
              index={index}
              slices={slices}
              context={undefined}
            />
          );
        }

        return null;
      })}
    </>
  );
}
