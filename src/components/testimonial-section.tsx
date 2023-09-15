"use client";
import { ReactNode } from "react";
import TestimonialCard, { TestimonialType } from "./testimonials-card";
import LocalCarousel from "@/app/layouts/carousel";

export default function TestimonialSection({
  testimonials,
}: {
  testimonials: TestimonialType[];
}) {
  return (
    <section
      aria-labelledby="testimonial-heading"
      className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h2
          id="testimonial-heading"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          What are people saying?
        </h2>

        <div className="mt-16 space-y-16">
          <LocalCarousel animated autoPlay infinite arrows={false}>
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} />
            ))}
          </LocalCarousel>
        </div>
      </div>
    </section>
  );
}
