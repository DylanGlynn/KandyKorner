import { useState } from "react";
import { ProductsList } from "./ProductsList.js";
import { ProductSearch } from "./ProductSearch.js";

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProductSearch setterFunction={setSearchTerms}/>
        <ProductsList searchTermState={searchTerms}/>
    </>
}