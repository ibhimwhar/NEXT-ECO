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

        // Simulate checkout process (e.g. payment, order creation)
        await Cart.findOneAndDelete({ userId });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Checkout API error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
