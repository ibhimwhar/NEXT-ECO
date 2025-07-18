// app/api/cart/get/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Cart from '@/models/Cart';

export async function POST(req) {
    try {
        await connectDB();

        const { userId } = await req.json();
        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }

        const cart = await Cart.findOne({ userId });

        return NextResponse.json({ success: true, cart: cart?.items || [] });
    } catch (error) {
        console.error('Fetch cart error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
