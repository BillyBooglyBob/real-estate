// Format price into a readable format
// e.g. 1000000 -> $1,000,000
// works with both "1000000" and 1000000
export const formatPrice = (price, noDollarSign) => {
  if (!price && price !== 0) return "";

  return `${noDollarSign ? "" : "$"}${price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const scrollToTopOfPage = () => {
  console.log("Scrolling to top");
  window.scrollTo({ top: 0, behavior: "smooth" });
};
