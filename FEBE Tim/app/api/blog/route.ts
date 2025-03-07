import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { PostgrestFilterBuilder } from "supabase"

export async function GET(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  const numericId = id ? parseInt(id, 10) : null;

  let query = supabase.from("blog_posts").select("*")

  if (numericId !== null) {
    query = (query as PostgrestFilterBuilder<any>).eq("id", numericId).single()
  } else {
    query = query.order("created_at", { ascending: false })
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

export async function PUT(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const { title, content } = await request.json()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user.user_metadata.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const numericId = id ? parseInt(id, 10) : null;

  if (numericId !== null) {
    const { data, error } = await supabase.from("blog_posts").update({ title, content }).eq("id", numericId).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } else {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const supabase = createClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user.user_metadata.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const numericId = id ? parseInt(id, 10) : null;

  if (numericId !== null) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", numericId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } else {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

