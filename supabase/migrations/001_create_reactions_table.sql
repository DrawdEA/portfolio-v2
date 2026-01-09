-- Create reactions table
CREATE TABLE IF NOT EXISTS reactions (
  emoji TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reactions_emoji ON reactions(emoji);

-- Insert initial heart reaction if it doesn't exist
INSERT INTO reactions (emoji, count)
VALUES ('❤️', 0)
ON CONFLICT (emoji) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_reactions_updated_at
  BEFORE UPDATE ON reactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to increment reaction count atomically
CREATE OR REPLACE FUNCTION increment_reaction(emoji_param TEXT)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO reactions (emoji, count)
  VALUES (emoji_param, 1)
  ON CONFLICT (emoji) 
  DO UPDATE SET count = reactions.count + 1
  RETURNING count INTO new_count;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql;
