import { NextResponse } from "next/server"
import { createClient } from "@/Back-End/lib/supabase/server"

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

