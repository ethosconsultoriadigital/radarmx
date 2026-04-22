-- Ejecutar UNA VEZ en Neon (SQL Editor) si Vercel se queda en:
--   "It looks like you've run Payload in dev mode..."
-- Borra el marcador de push en dev (batch = -1) que mezcla con migraciones.
-- Requiere backup si no estás seguro.

DELETE FROM payload_migrations
WHERE batch = -1 OR name = 'dev';
