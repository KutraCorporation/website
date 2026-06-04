interface Logo {
  png: string;
}

interface Link {
  id: number;
  name: string;
  link: string;
}

export interface Product {
  id: string;
  categories?: string[];
  name: string;
  logo?: Logo;
  description: string;
  links?: Link[];
}