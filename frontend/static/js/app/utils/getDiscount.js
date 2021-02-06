const GetDiscount = (origin, discounted) => ((origin -discounted) / origin * 100).toFixed(0);

export default GetDiscount;
