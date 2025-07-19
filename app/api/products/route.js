import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
    try {
        const response = await axios.get('https://fakestoreapi.com/products/');
        const products = response.data;

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error('Failed to fetch products:', error?.response?.data || error.message);

        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
