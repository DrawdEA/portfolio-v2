# Supabase Setup for Reactions

This guide will help you set up Supabase PostgreSQL for the reactions feature.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Your project name
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Wait for the project to be created (takes ~2 minutes)

## 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## 3. Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase/migrations/001_create_reactions_table.sql`
4. Click **Run** to execute the migration
5. This will create:
   - `reactions` table
   - Initial heart reaction (❤️) with count 0
   - Auto-update trigger for `updated_at`
   - `increment_reaction` function for atomic increments

## 4. Set Up Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Important**: 
- Never commit `.env.local` to git (it's already in `.gitignore`)
- For production (Vercel, etc.), add these as environment variables in your hosting platform

## 5. Enable Row Level Security (Optional but Recommended)

For better security, you can enable RLS on the reactions table:

```sql
-- Enable RLS
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reactions
CREATE POLICY "Allow public read access" ON reactions
  FOR SELECT
  USING (true);

-- Allow anyone to update reactions (for incrementing)
CREATE POLICY "Allow public update access" ON reactions
  FOR UPDATE
  USING (true);

-- Allow inserting new reactions
CREATE POLICY "Allow public insert access" ON reactions
  FOR INSERT
  WITH CHECK (true);
```

## 6. Test It Out

1. Start your development server: `npm run dev`
2. Visit your portfolio and click the heart reaction
3. Check your Supabase dashboard → **Table Editor** → `reactions` to see the count increment

## Troubleshooting

- **"Missing Supabase environment variables"**: Make sure `.env.local` has the correct variables
- **"relation 'reactions' does not exist"**: Run the migration SQL in Supabase SQL Editor
- **Connection errors**: Check that your Supabase project is active and the URL/key are correct

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add the environment variables in your hosting platform's dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Redeploy your application
3. The reactions will persist across all deployments! 🎉
