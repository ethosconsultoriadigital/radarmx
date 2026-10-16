import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Notas ya guardadas con status editorial «Publicado» pero `_status` draft
 * y/o `published_at` vacío. El hook cubre escrituras nuevas; esto alinea las existentes.
 * No toca borradores (`status = draft`).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "posts"
    SET
      "_status" = 'published',
      "published_at" = COALESCE("published_at", "created_at", now())
    WHERE "status" = 'published'
      AND ("_status" IS DISTINCT FROM 'published' OR "published_at" IS NULL);

    UPDATE "_posts_v" AS v
    SET
      "version__status" = 'published',
      "version_status" = 'published',
      "version_published_at" = COALESCE(v."version_published_at", v."version_created_at", v."created_at", now())
    FROM "posts" AS p
    WHERE v."parent_id" = p."id"
      AND v."latest" = true
      AND p."status" = 'published'
      AND (
        v."version__status" IS DISTINCT FROM 'published'
        OR v."version_published_at" IS NULL
      );
  `)
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // Backfill de datos: no hay forma segura de restaurar el _status anterior.
}
