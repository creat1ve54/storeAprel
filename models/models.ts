export interface ICard {
  id: number;
  name: string;
  imgSrc: string,
  descr: string,
  price: number,
  oldPrice: number | null,
  sale: number | null,
  options: {
    size: string,
    color: string,
    clothing: string,
  }
}