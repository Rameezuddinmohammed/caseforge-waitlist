-- Update the manifesto content
UPDATE manifesto
SET
  body = 'We believe learning should feel like solving real-world problems, not memorizing textbook jargon. We''re building a platform where ambition meets action — where every case sharpens your thinking, tests your instincts, and prepares you for the challenges of the business world. This is our manifesto: to break the mold of passive learning, to forge future leaders through simulation, and to design every experience with purpose, integrity, and the learner at heart.',
  author_name = 'Rameez Mohd',
  author_role = 'Founder & CEO',
  author_signature_name = NULL -- Remove the signature
WHERE id = (SELECT id FROM manifesto LIMIT 1);
