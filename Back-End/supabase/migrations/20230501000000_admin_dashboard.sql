-- Create user_analytics table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_analytics (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  visit_duration INTEGER DEFAULT 0,
  visit_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Add RLS policies for user_analytics table
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;

-- Allow users to see only their own analytics
CREATE POLICY "Users can view their own analytics"
  ON public.user_analytics
  FOR SELECT
  USING (auth.uid() = id);

-- Allow admins to view all analytics
CREATE POLICY "Admins can view all analytics"
  ON public.user_analytics
  FOR SELECT
  USING (
    (SELECT is_admin FROM auth.users WHERE id = auth.uid())
  );

-- Allow the system to insert and update analytics
CREATE POLICY "System can insert and update analytics"
  ON public.user_analytics
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create function to track user visits
CREATE OR REPLACE FUNCTION public.track_user_visit()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_analytics (id, email, last_visit, visit_duration, visit_count)
  VALUES (NEW.id, NEW.email, NOW(), 0, 1)
  ON CONFLICT (id) DO UPDATE
  SET last_visit = NOW(),
      visit_count = user_analytics.visit_count + 1;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to track user visits
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.track_user_visit();

-- Create function to update visit duration
CREATE OR REPLACE FUNCTION public.update_visit_duration(
  user_id UUID,
  duration INTEGER
)
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_analytics
  SET visit_duration = visit_duration + duration
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add is_admin column to auth.users if it doesn't exist in user_metadata
-- This is a helper function to check if a user is an admin
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT (raw_user_meta_data->>'is_admin')::boolean
    FROM auth.users
    WHERE id = auth.uid()
  );
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

