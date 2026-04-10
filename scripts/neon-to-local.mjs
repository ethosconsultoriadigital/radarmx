/**
 * Volcado desde Neon (.sql) y restauración en DATABASE_URI local.
 * Requiere: pg_dump y psql en PATH (PostgreSQL client tools).
 *
 * Uso:
 *   pnpm run db:sync-neon
 *
 * Variables en .env:
 *   NEON_DATABASE_URI — URL de conexión a Neon (solo para volcar; no subir al repo)
 *   DATABASE_URI — Postgres local donde restaurar (ej. postgresql://user:pass@127.0.0.1:5432/radarmx)
 *
 * Opciones:
 *   node scripts/neon-to-local.mjs --dump-only   solo genera backups/neon_backup.sql
 *   node scripts/neon-to-local.mjs --restore-only   solo importa backups/neon_backup.sql existente
 */

import { execFileSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

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
    process.env[key] = val
  }
}

loadEnvFile(resolve(root, '.env'))

const dumpOnly = process.argv.includes('--dump-only')
const restoreOnly = process.argv.includes('--restore-only')

const dumpPath = resolve(root, 'backups', 'neon_backup.sql')

/** Quita channel_binding=… (a veces pg_dump antiguo falla con Neon). */
function stripChannelBinding(uri) {
  if (!uri.includes('channel_binding')) return uri
  let out = uri.replace(/[&?]channel_binding=[^&]*/g, '')
  out = out.replace(/\?&/g, '?').replace(/&&+/g, '&')
  if (out.endsWith('?')) out = out.slice(0, -1)
  return out
}

/** @param {string} uri */
function parsePostgresUri(uri) {
  const normalized = uri.trim()
  const u = new URL(normalized.replace(/^postgresql:/, 'http:'))
  const database = u.pathname.replace(/^\//, '') || 'postgres'
  return {
    user: decodeURIComponent(u.username || ''),
    password: decodeURIComponent(u.password || ''),
    host: u.hostname,
    port: u.port || '5432',
    database,
    search: u.search || '',
  }
}

/** @param {{ user: string, password: string, host: string, port: string, database: string, search: string }} p */
function buildPostgresUri(p) {
  const auth =
    p.user !== '' ? `${encodeURIComponent(p.user)}:${encodeURIComponent(p.password)}@` : ''
  return `postgresql://${auth}${p.host}:${p.port}/${p.database}${p.search}`
}

/** Primera ruta en PATH (Windows: where, Unix: which). */
function resolveBin(cmd) {
  try {
    const bin = process.platform === 'win32' ? 'where.exe' : 'which'
    const out = execFileSync(bin, [cmd], { encoding: 'utf8' })
    const first = out.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)[0]
    return first || cmd
  } catch {
    return cmd
  }
}

const pgDump = resolveBin('pg_dump')
const psql = resolveBin('psql')

function runDump() {
  let neon = process.env.NEON_DATABASE_URI?.trim()
  if (!neon) {
    console.error(
      '[db] Falta NEON_DATABASE_URI en .env (cadena postgresql://… hacia Neon).',
    )
    process.exit(1)
  }
  neon = stripChannelBinding(neon)

  mkdirSync(resolve(root, 'backups'), { recursive: true })
  console.log('[db] Volcando Neon ->', dumpPath)
  execFileSync(pgDump, [neon, '-F', 'p', '--no-owner', '--no-acl', '-f', dumpPath], {
    stdio: 'inherit',
    env: process.env,
  })
  console.log('[db] Volcado listo.')
}

function runRestore() {
  const local = process.env.DATABASE_URI?.trim()
  if (!local) {
    console.error('[db] Falta DATABASE_URI en .env (Postgres local).')
    process.exit(1)
  }
  if (!existsSync(dumpPath)) {
    console.error('[db] No existe', dumpPath, '— ejecuta antes el volcado o pnpm run db:dump-neon')
    process.exit(1)
  }

  const target = parsePostgresUri(local)
  const admin = buildPostgresUri({ ...target, database: 'postgres' })
  const dbName = target.database

  console.log('[db] Recreando base local:', dbName)
  execFileSync(
    psql,
    [admin, '-v', 'ON_ERROR_STOP=1', '-c', `DROP DATABASE IF EXISTS "${dbName.replace(/"/g, '""')}" WITH (FORCE);`],
    { stdio: 'inherit', env: process.env },
  )
  execFileSync(psql, [admin, '-v', 'ON_ERROR_STOP=1', '-c', `CREATE DATABASE "${dbName.replace(/"/g, '""')}";`], {
    stdio: 'inherit',
    env: process.env,
  })

  console.log('[db] Restaurando SQL en', local)
  execFileSync(psql, [local, '-v', 'ON_ERROR_STOP=1', '-f', dumpPath], {
    stdio: 'inherit',
    env: process.env,
  })
  console.log('[db] Restauración lista.')
}

if (restoreOnly) {
  runRestore()
} else if (dumpOnly) {
  runDump()
} else {
  runDump()
  runRestore()
}
