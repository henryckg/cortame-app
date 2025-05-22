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
    const qr = await QRCode.toDataURL(String(original))
    return new Response(JSON.stringify({qr}), {
      status: 200,
      headers: {"Content-Type": "application/json"}
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify("Internal Server Error"), {status: 500})
  }
}

