#!/usr/bin/env node
/**
 * Vacía el esquema `public` de la base indicada en DATABASE_URI (BORRA TODOS LOS DATOS)
 * y ejecuta `pnpm run migrate`.
 *
 * Uso (PowerShell):
 *   $env:RADAR_RESET_DB_CONFIRM="yes"; pnpm run db:reset-and-migrate
 *
 * Requiere: DATABASE_URI en .env
 */
import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return
  const text = readFileSync(filePath, 'utf8')
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    const key = t.slice(0, eq).trim()
    let val = t.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = val
  }
}

loadEnvFile(resolve(root, '.env'))

function stripChannelBinding(uri) {
  if (!uri.includes('channel_binding')) return uri
  let out = uri.replace(/[&?]channel_binding=[^&]*/g, '')
  out = out.replace(/\?&/g, '?').replace(/&&+/g, '&')
  if (out.endsWith('?')) out = out.slice(0, -1)
  return out
}

if (process.env.RADAR_RESET_DB_CONFIRM !== 'yes') {
  console.error(
    '[db:reset] Operación destructiva. Establece RADAR_RESET_DB_CONFIRM=yes y vuelve a ejecutar.',
  )
  process.exit(1)
}

const uri = process.env.DATABASE_URI?.trim()
if (!uri) {
  console.error('[db:reset] Falta DATABASE_URI en .env')
  process.exit(1)
}

const safeUri = stripChannelBinding(uri)

async function run() {
  const client = new pg.Client({ connectionString: safeUri })
  console.log('[db:reset] Conectando…')
  await client.connect()
  try {
    console.log('[db:reset] DROP SCHEMA public CASCADE …')
    await client.query('DROP SCHEMA IF EXISTS public CASCADE')
    console.log('[db:reset] CREATE SCHEMA public …')
    await client.query('CREATE SCHEMA public')
    await client.query('GRANT ALL ON SCHEMA public TO PUBLIC')
    console.log('[db:reset] Esquema public recreado (vacío).')
  } finally {
    await client.end()
  }

  console.log('[db:reset] Ejecutando: pnpm run migrate …')
  execSync('pnpm run migrate', {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: process.env.NODE_OPTIONS || '--no-deprecation' },
  })
  console.log('[db:reset] Listo.')
}

run().catch((err) => {
  console.error('[db:reset] Error:', err.message)
  process.exit(1)
})
