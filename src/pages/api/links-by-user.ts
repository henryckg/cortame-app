import type { APIRoute } from "astro"
import { getUserLinks } from "@/db/client"

export const GET: APIRoute = async ({url}) => {
  const userId = new URL(url).searchParams.get("userId")

  if (!userId) {
    return new Response("User Id is missing", {status: 400})
  }

  try {
    const links = await getUserLinks(userId)
    return new Response(JSON.stringify(links), {status: 200})
  } catch (e) {
    console.error(e)
    return new Response("Internal Server Error", {status: 500})
  }
}