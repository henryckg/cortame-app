import { createClient } from "@libsql/client"

const client = createClient({
  url: import.meta.env.TURSO_DB_URL ?? "",
  authToken: import.meta.env.TURSO_DB_TOKEN ?? ""
})

export const createLink = async (id: string, original: string, userId: string ) => {
  const sql = `INSERT INTO urls (id, original, user_id) VALUES (?, ?, ?)`
  await client.execute({
    sql,
    args: [id, original, userId]
  })

  return id
}

export const getOriginalUrl = async (id: string) => {
  const sql = `SELECT original FROM urls WHERE id = ? LIMIT 1`

  const result = await client.execute({
    sql,
    args: [id]
  })

  return result.rows[0]?.original || null
}