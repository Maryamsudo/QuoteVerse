// app/api/quotes/route.js
export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/quotes", {
      cache: "no-store",
    });
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch quotes" }), {
      status: 500,
    });
  }
}
