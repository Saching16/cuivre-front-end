export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  altText: string | null;
  height: number | null;
  url: string;
  width: number | null;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  featuredImage: ShopifyImage | null;
  images: {
    nodes: ShopifyImage[];
  };
  variants: {
    nodes: ShopifyProductVariant[];
  };
};

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: ShopifyProductVariant & {
    product: {
      handle: string;
      title: string;
    };
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: {
    nodes: ShopifyCartLine[];
  };
};

export type ShopifyUserError = {
  field: string[] | null;
  message: string;
};
