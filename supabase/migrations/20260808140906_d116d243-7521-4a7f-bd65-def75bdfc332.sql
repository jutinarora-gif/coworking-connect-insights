ALTER TABLE public.spaces ADD COLUMN IF NOT EXISTS verified_at date;

UPDATE public.reviews SET is_hidden = true WHERE is_hidden = false;
UPDATE public.questions SET is_hidden = true WHERE is_hidden = false;
UPDATE public.answers SET is_hidden = true WHERE is_hidden = false;

UPDATE public.spaces SET verified_at = CURRENT_DATE WHERE verified_at IS NULL;
