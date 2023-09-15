"use client";
import { classNames } from "@/helper";

export type ProductType = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
};
export default function ProductListingCard({
  product,
}: {
  product: ProductType;
}) {
  return (
    <div
      key={product.id}
      className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
    >
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="pb-4 pt-10 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          <a href={product.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
        <div className="mt-3 flex flex-col items-center">
          <p className="sr-only">{product.rating} out of 5 stars</p>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <svg
                key={rating}
                className={classNames(
                  product.rating > rating ? "text-yellow-400" : "text-gray-200",
                  "h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {product.reviewCount} reviews
          </p>
        </div>
        <p className="mt-4 text-base font-medium text-gray-900">
          SLL. {product.price}
        </p>
      </div>
    </div>
  );
}
