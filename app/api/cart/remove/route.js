import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Cart from '@/models/Cart';

export async function POST(req) {
    try {
        await connectDB();

        const { userId, title } = await req.json();

        if (!userId || !title) {
            return NextResponse.json({ error: 'Missing userId or title' }, { status: 400 });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { title } } },
            { new: true }
        );

        return NextResponse.json({ success: true, cart: updatedCart });
    } catch (error) {
        console.error('API Remove Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
 