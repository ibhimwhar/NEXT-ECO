import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Cart from '@/models/Cart';

export async function POST(req) {
    try {
        await connectDB();

        const { userId, item } = await req.json();

        if (!userId || !item) {
            return NextResponse.json({ error: 'Missing userId or item' }, { status: 400 });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            const newCart = await Cart.create({ userId, items: [item] });
            return NextResponse.json({ success: true, cart: newCart });
        }

        const itemExists = cart.items.some(i => i.productId === item.productId);

        if (!itemExists) {
            cart.items.push(item);
            await cart.save();
        }

        return NextResponse.json({ success: true, cart });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
