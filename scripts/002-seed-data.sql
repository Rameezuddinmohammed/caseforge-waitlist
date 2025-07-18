-- Insert default settings
INSERT INTO settings (default_theme, forced_theme) 
VALUES ('system', NULL)
ON CONFLICT DO NOTHING;

-- Insert default waitlist data
INSERT INTO waitlist (title, subtitle) 
VALUES (
  'Join the Waitlist', 
  'Be the first to know when we launch. Get early access and exclusive updates.'
)
ON CONFLICT DO NOTHING;

-- Insert default navbar items
INSERT INTO navbar_items (title, href, order_index) VALUES
  ('Waitlist', '/', 0),
  ('Manifesto', '/manifesto', 1)
ON CONFLICT DO NOTHING;

-- Insert default manifesto
INSERT INTO manifesto (
  body, 
  author_name, 
  author_role, 
  author_signature_name
) VALUES (
  'We believe in building products that matter. Products that solve real problems and make people''s lives better. This is our manifesto - a commitment to excellence, innovation, and putting users first.',
  'John Doe',
  'Founder & CEO',
  'J. Doe'
)
ON CONFLICT DO NOTHING;

-- Insert default metadata
INSERT INTO metadata (
  default_title,
  default_description,
  title_template
) VALUES (
  'Waitlist - Join Us',
  'Join our waitlist to be the first to know when we launch.',
  '%s | Waitlist'
)
ON CONFLICT DO NOTHING;
