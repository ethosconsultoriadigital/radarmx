import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

/**
 * Quita el bloque featureWithSidebar («Destacado + Lista» / «Recientes»)
 * solo de la página con slug `home`. No toca otras páginas ni otros bloques.
 * El layout público también lo omite, por si esta migración ya corrió.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DELETE FROM "pages_blocks_feature_with_sidebar"
    WHERE "_parent_id" IN (
      SELECT "id" FROM "pages" WHERE "slug" = 'home'
    );

    DELETE FROM "_pages_v_blocks_feature_with_sidebar"
    WHERE "_parent_id" IN (
      SELECT v."id"
      FROM "_pages_v" v
      INNER JOIN "pages" p ON v."parent_id" = p."id"
      WHERE p."slug" = 'home'
    );
  `)
}

export async function down(_: MigrateDownArgs): Promise<void> {
  // El bloque no tiene campos propios; no hay copia para reinsertarlo.
}
