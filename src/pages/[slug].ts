import { type APIRoute } from "astro"
import { getOriginalUrl } from "@/db/client"

export const GET: APIRoute = async ({params, redirect}) => {
  const slug = typeof params.slug === "string" ? params.slug : null

  if (!slug) {
    return new Response("Slug inválido", { status: 400 })
  }

  const original = await getOriginalUrl(slug)

  if (typeof original !== "string") {
    return new Response("No encontrada", { status: 404 })
  }

  return redirect(original, 302)
}