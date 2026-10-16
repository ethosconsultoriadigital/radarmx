import * as migration_20260417_184106 from './20260417_184106'
import * as migration_20261016_180000_publish_publicado_posts from './20261016_180000_publish_publicado_posts'

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
]
