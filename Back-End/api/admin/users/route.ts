import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const supabase = createClient()

  // Check if user is admin
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session?.user.user_metadata.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const limit = searchParams.get("limit")

  // Fetch user analytics data
  let query = supabase.from("user_analytics").select("*").order("last_visit", { ascending: false })

  if (limit) {
    query = query.limit(Number.parseInt(limit))
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient()

  // Check if user is admin
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session?.user.user_metadata.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { email, password, is_admin } = await request.json()

  // Create user
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { is_admin },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Initialize analytics entry for the new user
  const { error: analyticsError } = await supabase.from("user_analytics").insert({
    id: data.user.id,
    email: data.user.email,
  })

  if (analyticsError) {
    console.error("Failed to create analytics entry:", analyticsError)
  }

  return NextResponse.json(data.user)
}

