export interface Recipe {
  id: number;
  image: string;
  imageType: string;
  title: string;
  nutrition: any;
}

export interface Ingredient {
  id: number;
  name: string;
  image: string;
}
