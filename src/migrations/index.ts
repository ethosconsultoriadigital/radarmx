import * as migration_20260417_184106 from './20260417_184106'
import * as migration_20261016_180000_publish_publicado_posts from './20261016_180000_publish_publicado_posts'
import * as migration_20261111_120000_media_prefix from './20261111_120000_media_prefix'
import * as migration_20261112_163200_remove_home_feature_sidebar from './20261112_163200_remove_home_feature_sidebar'

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
    up: migration_20261111_120000_media_prefix.up,
    down: migration_20261111_120000_media_prefix.down,
    name: '20261111_120000_media_prefix',
  },
  {
    up: migration_20261112_163200_remove_home_feature_sidebar.up,
    down: migration_20261112_163200_remove_home_feature_sidebar.down,
    name: '20261112_163200_remove_home_feature_sidebar',
  },
]
