export const PRODUCT_BY_HANDLE_QUERY = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      featuredImage {
        altText
        height
        url
        width
      }
      images(first: 10) {
        nodes {
          altText
          height
          url
          width
        }
      }
      variants(first: 10) {
        nodes {
          id
          title
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

export const CART_FRAGMENT = `#graphql
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 20) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            product {
              handle
              title
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const CART_QUERY = `#graphql
  ${CART_FRAGMENT}

  query Cart($id: ID!) {
    cart(id: $id) {
      ...CartFragment
    }
  }
`;

export const CART_CREATE_MUTATION = `#graphql
  ${CART_FRAGMENT}

  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `#graphql
  ${CART_FRAGMENT}

  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `#graphql
  ${CART_FRAGMENT}

  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `#graphql
  ${CART_FRAGMENT}

  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
`;
