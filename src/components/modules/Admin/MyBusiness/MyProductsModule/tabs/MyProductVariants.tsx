import { ProductVariant } from "@/ts/models/booking/product/Product";
import React from "react";

type MyProductVariantsProps = {
  variants: ProductVariant[];
};

const MyProductVariants = ({ variants }: MyProductVariantsProps) => {
  console.log("VARIANTS!!!", variants);

  return <div></div>;
};

export default MyProductVariants;
