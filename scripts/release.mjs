#!/usr/bin/env node
/**
 * 1) Aplica migraciones pendientes contra la BD indicada en DATABASE_URI (.env).
 * 2) Ejecuta git push con los argumentos que le pases.
 *
 * Uso:
 *   pnpm run release
 *   pnpm run release -- origin main
 *   pnpm run release -- -u origin feature/foo
 *
 * Antes de publicar a producción: pon en .env la DATABASE_URI de Neon (producción),
 * ejecuta este comando, y las migraciones correrán antes del push.
 */
import { execSync, spawnSync } from 'child_process'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

try {
  const dotenv = await import('dotenv')
  dotenv.config({ path: resolve(root, '.env') })
} catch {
  /* dotenv opcional */
}

console.log('[release] DATABASE_URI:', process.env.DATABASE_URI ? '(definida)' : '¡FALTA!')

console.log('[release] Ejecutando: pnpm run migrate …')
execSync('pnpm run migrate', {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
})

const extra = process.argv.slice(2)
console.log('[release] Ejecutando: git push', extra.length ? extra.join(' ') : '(predeterminado)')
const result = spawnSync('git', ['push', ...extra], {
  cwd: root,
  stdio: 'inherit',
  shell: false,
})

process.exit(result.status === null ? 1 : result.status)
