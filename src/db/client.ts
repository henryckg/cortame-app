import { createClient } from "@libsql/client"

const client = createClient({
  url: import.meta.env.TURSO_DB_URL ?? "",
  authToken: import.meta.env.TURSO_DB_TOKEN ?? ""
})

export const createLink = async (id: string | undefined, original: string, userId: string ) => {
  const slug = id && id.trim() !== "" ? id : crypto.randomUUID().slice(0, 6)
  const sql = `INSERT INTO urls (id, original, user_id) VALUES (?, ?, ?)`
  
  await client.execute({
    sql,
    args: [slug, original, userId]
  })

  return slug
}

export const getOriginalUrl = async (id: string) => {
  const sql = `SELECT original FROM urls WHERE id = ? LIMIT 1`

  const result = await client.execute({
    sql,
    args: [id]
  })

  return result.rows[0]?.original || null
}

export const createUser = async (user:string) => {
  const sql = `INSERT INTO users (email) VALUES (?)`

  await client.execute({
    sql,
    args: [user]
  })

  return user
}

export const getUser = async (user: string) => {
  const sql = `SELECT email FROM users WHERE email = ?`

  const result = await client.execute({sql, args: [user]})
  return result.rows[0]?.email
}

export const getUserLinks = async (user: string) => {
  const sql = `SELECT id, original, created_at FROM urls WHERE user_id = ? ORDER BY created_at DESC`
  const results = await client.execute({
    sql,
    args: [user]
  })

  return results.rows
}

export const deleteLink = async (id: string, userId: string) => {
  const sql = `DELETE FROM urls WHERE id = ? AND user_id = ?`

  const result = await client.execute({
    sql,
    args: [id, userId]
  })

  return result.rowsAffected > 0
}