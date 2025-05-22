import { getOriginalUrl } from "@/db/client"
import type {APIRoute} from "astro"
import QRCode from "qrcode"

export const GET: APIRoute = async ({ params }) => {
  const id = params.id

  if (!id) {
    return new Response(JSON.stringify({error: "ID is missing"}), {status: 400})
  }

  const original = await getOriginalUrl(id)
  if (!original) {
    return new Response(JSON.stringify({error: "URL not found"}), {status: 404})
  }

  try {
    const svg = await QRCode.toString(String(original), {
      type: "svg",
      color: {
        dark: "#00d492",
        light: "#1c2b27"
      },
      margin: 1,
      width: 300
    })
    return new Response(JSON.stringify({svg}), {
      status: 200,
      headers: {"Content-Type": "application/json"}
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify("Internal Server Error"), {status: 500})
  }
}

