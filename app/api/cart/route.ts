import { NextResponse } from "next/server";
import {
  addCartLines,
  createCart,
  getCart,
  removeCartLines,
  updateCartLines
} from "@/lib/shopify/cart";

type AddCartRequest = {
  cartId?: string;
  merchandiseId?: string;
  quantity?: number;
};

type UpdateCartRequest = {
  cartId?: string;
  lineId?: string;
  merchandiseId?: string;
  quantity?: number;
};

type RemoveCartRequest = {
  cartId?: string;
  lineIds?: string[];
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cartId = searchParams.get("cartId");

  if (!cartId) {
    return jsonError("Missing cart id.");
  }

  const cart = await getCart(cartId);

  return NextResponse.json({ cart });
}

export async function POST(request: Request) {
  const body = (await request.json()) as AddCartRequest;

  if (!body.merchandiseId) {
    return jsonError("Missing merchandise id.");
  }

  const line = {
    merchandiseId: body.merchandiseId,
    quantity: body.quantity ?? 1
  };

  const cart = body.cartId
    ? await addCartLines(body.cartId, [line])
    : await createCart(line);

  return NextResponse.json({ cart });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as UpdateCartRequest;

  if (!body.cartId || !body.lineId) {
    return jsonError("Missing cart id or line id.");
  }

  if (!body.quantity || body.quantity < 1) {
    const cart = await removeCartLines(body.cartId, [body.lineId]);
    return NextResponse.json({ cart });
  }

  const cart = await updateCartLines(body.cartId, [
    {
      id: body.lineId,
      merchandiseId: body.merchandiseId,
      quantity: body.quantity
    }
  ]);

  return NextResponse.json({ cart });
}

export async function DELETE(request: Request) {
  const body = (await request.json()) as RemoveCartRequest;

  if (!body.cartId || !body.lineIds?.length) {
    return jsonError("Missing cart id or line ids.");
  }

  const cart = await removeCartLines(body.cartId, body.lineIds);

  return NextResponse.json({ cart });
}
