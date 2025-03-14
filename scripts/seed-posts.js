import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing environment variables")
  process.exit(1)
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

async function seedPosts() {
  try {
    // Read sample posts data
    const postsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "public", "sample-posts.json"), "utf8"))

    // Get admin user
    const { data: adminUser, error: userError } = await supabase
      .from("profiles")
      .select("id")
      .eq("role", "admin")
      .single()

    if (userError) {
      console.error("Error fetching admin user:", userError)
      return
    }

    const adminId = adminUser.id

    // Insert posts
    for (const post of postsData) {
      const { error } = await supabase.from("posts").insert({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        category: post.category,
        image_url: post.image_url,
        author_id: adminId,
        published: true,
      })

      if (error) {
        console.error(`Error inserting post "${post.title}":`, error)
      } else {
        console.log(`Successfully inserted post: ${post.title}`)
      }
    }

    console.log("Seeding completed successfully!")
  } catch (error) {
    console.error("Error seeding posts:", error)
  }
}

seedPosts()

