"use client";

export type TestimonialType = {
  id: string;
  attribution: string;
  quote: string;
  img?: string;
  name?: string;
};

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: TestimonialType;
}) {
  return (
    <blockquote key={testimonial.id} className="sm:flex lg:block">
      <svg
        width={24}
        height={18}
        viewBox="0 0 24 18"
        aria-hidden="true"
        className="flex-shrink-0 text-gray-300"
      >
        <path
          d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
          fill="currentColor"
        />
      </svg>
      {testimonial.img && (
        <a href="#" className="group block flex-shrink-0 mt-2">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={testimonial.img}
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {testimonial.name}
              </p>
              {/* <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
              View profile
            </p> */}
            </div>
          </div>
        </a>
      )}
      <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
        <p className="text-lg text-gray-600">{testimonial.quote}</p>
        {/* <cite className="mt-4 block font-semibold not-italic text-gray-900">
          {testimonial.attribution}
        </cite> */}
      </div>
    </blockquote>
  );
}
