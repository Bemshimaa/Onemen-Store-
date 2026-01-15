const products = [
  {
    name: "Red & White tee",
    image: "/images/product-card-1.jpg",
    description:
      "Rep ONEMEN in a vintage-inspired top. Dropped shoulders and a baggy fit keep it relaxed and casual.",
    brand: "OneMen",    // <--- Added Brand
    category: "Tees",   // <--- Added Category
    price: "N27,000",
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Short Sleeve Polo",
    image: "/images/product-card-2.jpg",
    description:
      "Classic polo style with modern cut. Heavyweight cotton fabric adds a structured feel.",
    brand: "OneMen",    // <--- Added Brand
    category: "Polos",  // <--- Added Category
    price: "N27,000",
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Onemen Jersey",
    image: "/images/Product-card-3.jpg",
    description:
      "Breathable jersey fabric for everyday wear. Perfect for the streets or the pitch.",
    brand: "OneMen",    // <--- Added Brand
    category: "Jerseys",// <--- Added Category
    price: "N27,000",
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: "Receipt Tee",
    image: "/images/Product-card-4.jpg",
    description:
      "Signature receipt graphic on back. A statement piece for your wardrobe.",
    brand: "OneMen",    // <--- Added Brand
    category: "Tees",   // <--- Added Category
    price: "N27,000",
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
];

module.exports = products;