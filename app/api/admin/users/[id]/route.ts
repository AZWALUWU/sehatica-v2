import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()

  // Check if user is admin
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session?.user.user_metadata.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  const { is_admin } = await request.json()

  // Update user metadata
  const { data, error } = await supabase.auth.admin.updateUserById(params.id, { user_metadata: { is_admin } })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data.user)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient()

  // Check if user is admin
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session?.user.user_metadata.is_admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  // Delete user
  const { error } = await supabase.auth.admin.deleteUser(params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

