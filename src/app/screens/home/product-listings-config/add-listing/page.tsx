"use client";
import AppLayout from "@/app/layouts/app-layout";
import LocalCarousel from "@/app/layouts/carousel";
import Dropzone, { FileType } from "@/components/dropzone";
import ProductListingCard from "@/components/product-listing-card";
import RatingStarComponent from "@/components/rating-star";
import { routes } from "@/config";
import { products } from "@/data";
import { knownColors } from "@/utils/color-utils";
import { Popover } from "@headlessui/react";
import {
  ChevronRightIcon,
  Cog6ToothIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { LegacyRef, useEffect, useMemo, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
var nearestColor = require("nearest-color").from(knownColors);

type productCattigory =
  | "Vehicles"
  | "Home and Garden"
  | "Electronics"
  | "Clothing and Accessories"
  | "Hobbies and Toys"
  | "Classifieds"
  | "Entertainment"
  | "Family"
  | "Free Stuff"
  | "Home Sales"
  | "Jewelry and Accessories"
  | "Pets"
  | "Sports and Outdoors"
  | "Tools"
  | "Art and Collectibles"
  | "Books"
  | "Crafts"
  | "Videogames"
  | "Business and Industrial"
  | "Health and Beauty"
  | "Tickets"
  | "Other";

const validationSchema = Yup.object({
  prod_name: Yup.string().required("Product Name is required"),
  price: Yup.number().required("Product Price is required"),
  carigories: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  preview: Yup.array(Yup.string())
    .min(1, "At least one image in needed")
    .required("Preview is required"),
});
export default function AddListing() {
  const FORM_KEY = "product_form";
  let router = useRouter();

  const formik = useFormik({
    initialValues: {
      prod_name: "",
      price: 0,
      carigories: "",
      description: "",
      preview: [] as string[],
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
      router.push(`${routes.home.profile}#listing`);
    },
  });

  const [imagesSrc, setImagesSrc] = useState<FileType[]>(); // Use an empty state value
  const [mainImageIndex, setSelectMainimageIndex] = useState<number>(0); // Use an empty state value

  const handleImagesChange = (imageUrl: FileType[]) => {
    formik.setFieldValue(
      "preview",
      imageUrl.map((f) => f.preview)
    );
    setImagesSrc(imageUrl);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl  mx-auto py-5 lg:px-8  flex items-center justify-center flex-col flex-nowrap">
        <div className="border-b border-gray-900/10  flex w-full mx-5  sm:px-0  md:py-10   md:gap-10  py-5  gap-5 px-3">
          <BreadCrump />
        </div>
        <form
          key={FORM_KEY}
          onSubmit={formik.handleSubmit}
          className="space-y-12 px-4 py-4 md:py-8 md:w-[46rem] w-full "
        >
          <div className="pb-12 ">
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6">
              <div className="md:col-span-3    col-span-6">
                <label
                  htmlFor="prod_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="prod_name"
                    autoComplete="name"
                    {...formik.getFieldProps("prod_name")}
                    className={
                      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 " +
                      "focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " +
                      (formik.errors["prod_name"] && formik.touched["prod_name"]
                        ? "border-red-500" // You can add a specific class for error state
                        : "")
                    }
                  />
                  {formik.errors["prod_name"] &&
                    formik.touched["prod_name"] && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors["prod_name"]}
                      </div>
                    )}
                </div>
              </div>

              <div className="md:col-span-3 col-span-6">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Price
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">le</span>
                  </div>
                  <input
                    type="text"
                    id="price"
                    // className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    {...formik.getFieldProps("price")}
                    className={
                      "block w-full rounded-md border-0 pl-10 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 " +
                      "focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 " +
                      (formik.errors["price"] && formik.touched["price"]
                        ? "border-red-500" // You can add a specific class for error state
                        : "")
                    }
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      SLL
                    </span>
                  </div>
                </div>
                {formik.errors["price"] && formik.touched["price"] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors["price"]}
                  </div>
                )}
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="carigories"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Carigories
                </label>
                <div className="mt-2">
                  <select
                    id="carigories"
                    autoComplete="carigories"
                    {...formik.getFieldProps("carigories")}
                    className={
                      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 " +
                      (formik.errors["carigories"] &&
                      formik.touched["carigories"]
                        ? "border-red-500" // You can add a specific class for error state
                        : "")
                    }
                  >
                    <option value={"Vehicles"}>Vehicles</option>
                    <option value={"Electronics"}>Electronics</option>
                    <option value={"Clothing and Accessories"}>
                      Clothing and Accessories
                    </option>
                    <option value={"Entertainment"}>Entertainment</option>
                    <option value={"Jewelry and Accessories"}>
                      Jewelry and Accessories
                    </option>
                    <option value={"Pets"}>Pets</option>
                    <option value={"Sports and Outdoors"}>
                      Sports and Outdoors
                    </option>
                    <option value={"Tools"}>Tools</option>
                    <option value={"Art and Collectibles"}>
                      Art and Collectibles
                    </option>
                    <option value={"Books"}>Books</option>
                    <option value={"Crafts"}>Crafts</option>
                    <option value={"Videogames"}>Videogames</option>
                    <option value={"Business and Industrial"}>
                      Business and Industrial
                    </option>
                    <option value={"Health and Beauty"}>
                      Health and Beauty
                    </option>
                    <option value={"Tickets"}>Tickets</option>
                    <option value={"Other"}>Other</option>
                  </select>
                  {formik.errors["carigories"] &&
                    formik.touched["carigories"] && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors["carigories"]}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    // name="description"
                    rows={3}
                    {...formik.getFieldProps("description")}
                    className={
                      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm " +
                      "ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 " +
                      "focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" +
                      (formik.errors["carigories"] &&
                      formik.touched["description"]
                        ? "border-red-500" // You can add a specific class for error state
                        : "")
                    }
                  />
                </div>

                {formik.errors["description"] &&
                  formik.touched["description"] && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors["description"]}
                    </div>
                  )}
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about your product.
                </p>
              </div>

              {/* dropzone */}
              <div className="col-span-full">
                <Dropzone
                  initialImages={imagesSrc}
                  onImgesSelected={(src) => {
                    handleImagesChange(src);
                  }}
                />
                {formik.errors["preview"] && formik.touched["preview"] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors["preview"]}
                  </div>
                )}
              </div>
            </div>

            <ConfigSection
              imagesSrc={imagesSrc ?? []}
              mainImageIndex={mainImageIndex}
              setSelectMainimageIndex={setSelectMainimageIndex}
              productName={formik.values.prod_name}
              productCost={formik.values.price}
            />

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                // onClick={}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

function ConfigSection({
  imagesSrc,
  setSelectMainimageIndex,
  mainImageIndex,
  productName,
  productCost,
}: {
  imagesSrc: FileType[];
  setSelectMainimageIndex: (ind: number) => void;
  mainImageIndex: number;
  productName: string;
  productCost: number;
}) {
  useEffect(() => {}, [imagesSrc]);
  return (
    <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-6  ">
      <div className="md:col-span-3 sm:col-span-3 col-span-full">
        <ProductConfig
          images={imagesSrc ?? []}
          setSelectedMainIndex={(ind) => {
            setSelectMainimageIndex(ind);
          }}
        />
      </div>
      <div className="md:col-span-3  sm:col-span-3 col-span-full ">
        <PreviewProductListingCard
          product={{
            ...products[0],
            price: productCost,
            name: productName,
            imageFile:
              imagesSrc.length > 0
                ? (imagesSrc[mainImageIndex] as File)
                : undefined,
          }}
        />
      </div>
    </div>
  );
}

function BreadCrump() {
  const pages = [
    { name: "Listings", href: routes.home.productListing, current: false },
    { name: "Add Product", href: routes.home.addProductListing, current: true },
  ];
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link
              href={routes.home.profile}
              className="text-gray-400 hover:text-gray-500"
            >
              <Cog6ToothIcon
                className="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="sr-only">Settings</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <a
                href={page.href}
                className={`ml-4 text-sm font-medium  ${
                  page.current
                    ? "text-primary hover:text-primary-dark"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function AddColorButton({ setColor }: { setColor: (color: string) => void }) {
  const [color, onColorChange] = useState("#ffffff");
  useEffect(() => {}, [color]);
  return (
    <div className="inline-block">
      <Popover className="relative">
        <Popover.Button>
          <div className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <span>
              <PlusIcon
                className=" h-5 w-5 text-gray-400 "
                aria-hidden="true"
              />
            </span>
          </div>
        </Popover.Button>

        <Popover.Panel className="absolute z-10">
          <div className="flex flex-col flex-none ">
            <button
              onClick={() => setColor(color)}
              type="button"
              className="inline-flex  w-full items-center justify-center gap-x-1.5 rounded-md   px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300   shadow-md"
              style={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                margin: 0,
                backgroundColor: color,
              }}
            >
              Select
            </button>
            <SketchPicker
              styles={{
                default: {
                  picker: {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  },
                },
              }}
              color={color}
              disableAlpha
              onChange={(c) => onColorChange(c.hex)}
              onChangeComplete={(c) => {
                // setColor(c.hex)
              }}
            />
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
}

function AddColorCard({
  color,
  onClick,
}: {
  color: string;
  onClick: () => void;
}) {
  return (
    <div className="inline-block cursor-pointer" onClick={onClick}>
      <div
        className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}

function ColorPalette() {
  let [colors, addColor] = useState<string[]>([]);
  // useEffect(() => {}, [colors]);
  return (
    <div className="p-4 sm:p-6">
      <div className="text-left ">Choose colors</div>
      <div className="pt-10 max-w-[23] flex flex-wrap gap-2 relative">
        {useMemo(() => {
          return colors?.map((color, i) => (
            <AddColorCard
              key={color + i}
              color={color}
              onClick={() => {
                let _colors = colors;
                let firstPart = _colors.slice(0, i);
                let lastPart = _colors.slice(i + 1);
                addColor([...firstPart, ...lastPart]);
              }}
            />
          ));
        }, [colors])}
        <AddColorButton
          setColor={(color) => {
            let nearest_col = nearestColor(color);
            // console.log(nearest_col);
            addColor((prev) => [...prev, color]);
          }}
        />
      </div>
    </div>
  );
}

function ProductConfig({
  setSelectedMainIndex,
  images,
}: {
  setSelectedMainIndex: (ind: number) => void;
  images: FileType[];
}) {
  if (images.length < 1) {
    return <></>;
  }
  return (
    <div
      className={`group relative  border `}
      // className={`group relative border   border-gray-200 p-4 sm:p-6 max-w-xs`}
    >
      <div className="text-right p-2">Configure</div>
      <div className="aspect-h-1  aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        <div className="max-h-md">
          <LocalCarousel
            infinite
            responsive={{
              superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                // breakpoint: { max: 4000, min: 3000 },
                items: 1,
                slidesToSlide: 1,
              },
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                // breakpoint: { max: 3000, min: 1024 },
                items: 1,
                slidesToSlide: 1,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                // breakpoint: { max: 1024, min: 464 },
                items: 1,
                slidesToSlide: 1,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                // breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
              },
            }}
          >
            {useMemo(() => {
              return images.map((img, i) => {
                return (
                  <div className="relative" key={i}>
                    <div className="absolute w-full h-full  bg-opacity-50 bg-black md:opacity-0 opacity-100 hover:opacity-100 flex justify-center items-center">
                      <button
                        onClick={() => setSelectedMainIndex(i)}
                        className="border border-primary hover:border-primary-dark bg-transparent px-3 py-2 rounded text-primary hover:text-primary-dark"
                      >
                        select main
                      </button>
                    </div>
                    <img
                      src={img.preview}
                      alt={"listing img" + i}
                      className="w-full object-cover object-center"
                    />
                  </div>
                );
              });
            }, [images])}
          </LocalCarousel>
        </div>
      </div>

      <ColorPalette />
    </div>
  );
}

function PreviewProductListingCard({
  product,
}: {
  product: {
    id: string;
    imageFile?: File;
    imageAlt: string;
    href: string;
    name: string;
    rating: number;
    price: number;
  };
}) {
  // const ref = useRef<HTMLImageElement>();
  const [imageSrc, setImageSrc] = useState<
    string | ArrayBuffer | null | undefined
  >();
  useEffect(() => {
    if (product.imageFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        // event.target.result contains the data URL
        const dataURL = event.target?.result;
        setImageSrc(dataURL);
      };
      reader.readAsDataURL(product.imageFile);
    }
  });
  if (!product.imageFile) {
    return <></>;
  }
  return (
    <div key={product.id} className={`group relative  border `}>
      <div className="text-right p-2">Preview</div>
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        <img
          // ref={ref as any}
          // key={product.imageSrc}
          src={imageSrc as any}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className=" p-4 sm:p-6   pt-10 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          <a href={product.href}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
        <div className="mt-3 flex flex-col items-center">
          <p className="sr-only">{product.rating} out of 5 stars</p>
          <div className="flex items-center">
            <RatingStarComponent rate={0} />
          </div>
        </div>
        <p className="mt-4 text-base font-medium text-gray-900">
          SLL. {product.price}
        </p>
      </div>
    </div>
  );
}
