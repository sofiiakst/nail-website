import { getApps, getAppsByTech } from "@/app/lib/dataServices";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tech = searchParams.get("tech");
    if (tech == "Random") {
      const randomApps = await getApps();
      return new Response(JSON.stringify(randomApps), { status: 200 });
    }

    if (!tech) {
      return new Response(
        JSON.stringify({ error: "Tech parameter is required" }),
        { status: 400 }
      );
    }

    const apps = await getAppsByTech(tech);

    return new Response(JSON.stringify(apps), { status: 200 });
  } catch (error) {
    console.error("Error retrieving appointments:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
