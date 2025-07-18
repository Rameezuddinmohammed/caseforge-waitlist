-- Update the waitlist subtitle
UPDATE waitlist 
SET subtitle = 'Be among the first to use Caseforge and Get lifetime free access to premium learning tools.'
WHERE id = (SELECT id FROM waitlist LIMIT 1);
