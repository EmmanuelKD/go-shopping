"use client";
import { ReactNode } from "react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive:ResponsiveType = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    // breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    // breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    // breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    // breakpoint: { max: 464, min: 0 },
    items: 1, 
  },
};

export default function LocalCarousel({
  children,
  animated,
  infinite,
  autoPlay,
  arrows
}: {
  children: ReactNode;
  animated?: boolean;
  autoPlay?: boolean;
  infinite?: boolean;
  arrows?: boolean;
}) {
  return (
    <Carousel
   arrows={arrows}
       autoPlay={autoPlay}
      infinite={infinite}
      responsive={responsive}
      rewindWithAnimation={animated}
    >
      {children}
    </Carousel>
  );
}

{
  /* <div>Item 1</div>
<div>Item 2</div>
<div>Item 3</div>
<div>Item 4</div> */
}
