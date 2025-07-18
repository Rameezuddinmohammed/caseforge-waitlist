-- Update the waitlist subtitle
UPDATE waitlist
SET subtitle = 'Join the waitlist and unlock exclusive access to premium case-solving tools, simulations, and rewards before anyone else.'
WHERE id = (SELECT id FROM waitlist LIMIT 1);
