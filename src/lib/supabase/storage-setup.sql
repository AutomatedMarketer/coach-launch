-- ============================================================
-- Supabase Storage: brand-assets bucket
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Create the brand-assets bucket (public so generated URLs work)
INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-assets', 'brand-assets', true);

-- Allow authenticated users to upload brand assets
CREATE POLICY "Users can upload brand assets"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'brand-assets');

-- Allow authenticated users to view brand assets
CREATE POLICY "Users can view brand assets"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'brand-assets');

-- Allow authenticated users to delete brand assets
CREATE POLICY "Users can delete brand assets"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'brand-assets');
