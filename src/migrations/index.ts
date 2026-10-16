import * as migration_20260417_184106 from './20260417_184106'
import * as migration_20261016_180000_publish_publicado_posts from './20261016_180000_publish_publicado_posts'
import * as migration_20261016_183054_users_api_key from './20261016_183054_users_api_key'

export const migrations = [
  {
    up: migration_20260417_184106.up,
    down: migration_20260417_184106.down,
    name: '20260417_184106',
  },
  {
    up: migration_20261016_180000_publish_publicado_posts.up,
    down: migration_20261016_180000_publish_publicado_posts.down,
    name: '20261016_180000_publish_publicado_posts',
  },
  {
    up: migration_20261016_183054_users_api_key.up,
    down: migration_20261016_183054_users_api_key.down,
    name: '20261016_183054_users_api_key',
  },
]
