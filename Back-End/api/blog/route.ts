import { NextResponse } from "next/server"
import { createClient } from "@/Back-End/lib/supabase/server"

export async function GET(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const limit = searchParams.get("limit")

  let query = supabase.from("blog_posts").select("*")

  if (id) {
    query = query.eq("id", id).single()
  } else {
    query = query.order("created_at", { ascending: false })
    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()
  const { title, content } = await request.json()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user.user_metadata.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({ title, content, user_id: session.user.id })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

