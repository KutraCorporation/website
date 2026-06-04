import ProductsPageContent from "@/components/ProductsPageContent";
import { products, baseUrl } from "@/lib/utils";
import type { Metadata } from "next";

const combinedSchema = [
  {
    "@type": "ItemList",
    "name": "Kutra Ecosystem Products",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/products/${product.id}/#software`,
        "name": product.name,
        "url": `${baseUrl}/products/${product.id}`,
        "publisher": { "@id": `${baseUrl}/#organization` },
        "author": { "@id": `${baseUrl}/#organization` },
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "Android, iOS, Web, Windows, Linux",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "ratingCount": "1"
        }
      }
    }))
  }
];

export const metadata: Metadata = {
  title: "Products",
  alternates: {
    canonical: baseUrl + "/products",
    languages: {
      "x-default": baseUrl + "/en/products",
      "en": baseUrl + "/en/products",
      "tr": baseUrl + "/tr/products",
    }
  }
};

export default function Products() {
  return (
    <>
      <script
        id="kutra-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema).replace(/</g, '\u003c') }}
      />
      <ProductsPageContent products={products.slice(0, 6)} />
    </>
  );
}