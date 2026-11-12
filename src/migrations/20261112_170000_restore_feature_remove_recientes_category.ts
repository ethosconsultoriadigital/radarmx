import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * La migración anterior borró featureWithSidebar de la página home.
 * Ese bloque lista las notas más nuevas (fotos en R2) y hay que devolverlo.
 * El categoryBlock de la categoría Recientes (id 1) es el que muestra
 * notas viejas con fotos en GCS. Se quita solo de home.
 */
const FEATURE_BLOCK_ID = '6a0f5eature51deb10ck0001'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    INSERT INTO "pages_blocks_feature_with_sidebar" ("_order", "_parent_id", "_path", "id")
    SELECT
      COALESCE((
        SELECT MAX(c."_order")
        FROM "pages_blocks_category_block" c
        WHERE c."_parent_id" = p."id"
      ), 0) + 1,
      p."id",
      'layout',
      ${FEATURE_BLOCK_ID}
    FROM "pages" p
    WHERE p."slug" = 'home'
      AND NOT EXISTS (
        SELECT 1
        FROM "pages_blocks_feature_with_sidebar" f
        WHERE f."_parent_id" = p."id"
      );
  `)

  await db.execute(sql`
    INSERT INTO "_pages_v_blocks_feature_with_sidebar" ("_order", "_parent_id", "_path", "_uuid")
    SELECT
      COALESCE((
        SELECT MAX(c."_order")
        FROM "_pages_v_blocks_category_block" c
        WHERE c."_parent_id" = v."id"
      ), 0) + 1,
      v."id",
      'layout',
      ${FEATURE_BLOCK_ID}
    FROM "_pages_v" v
    INNER JOIN "pages" p ON v."parent_id" = p."id"
    WHERE p."slug" = 'home'
      AND v."latest" = true
      AND NOT EXISTS (
        SELECT 1
        FROM "_pages_v_blocks_feature_with_sidebar" f
        WHERE f."_parent_id" = v."id"
      );
  `)

  await db.execute(sql`
    DELETE FROM "pages_blocks_category_block"
    WHERE "category_id" = 1
      AND "_parent_id" IN (
        SELECT "id" FROM "pages" WHERE "slug" = 'home'
      );
  `)

  await db.execute(sql`
    DELETE FROM "_pages_v_blocks_category_block"
    WHERE "category_id" = 1
      AND "_parent_id" IN (
        SELECT v."id"
        FROM "_pages_v" v
        INNER JOIN "pages" p ON v."parent_id" = p."id"
        WHERE p."slug" = 'home'
      );
  `)
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // No reinserta el categoryBlock ni borra el feature restaurado.
}
