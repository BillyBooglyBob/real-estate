// Format price into a readable format
// e.g. 1000000 -> $1,000,000
export const formatPrice = (price) => {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;    
}