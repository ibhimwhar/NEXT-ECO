import axios from "axios";

export async function GET(request) {
    try {
        const response = await axios.get("https://fakestoreapi.com/products/");
        const products = response.data;

        return new Response(JSON.stringify(products), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 200,
        });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch products" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 500,
            }
        );
    }
} 