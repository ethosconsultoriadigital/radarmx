import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_pages_blocks_hero_grid_source" AS ENUM('latest', 'byCategory', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_hero_grid_locale" AS ENUM('es', 'en', 'pt');
  CREATE TYPE "public"."enum_pages_blocks_category_menu_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum_pages_blocks_row_cells_v_align" AS ENUM('self-stretch', 'self-start', 'self-center', 'self-end');
  CREATE TYPE "public"."enum_pages_blocks_row_max_width" AS ENUM('lg', 'xl', '2xl', '7xl', 'full');
  CREATE TYPE "public"."enum_pages_blocks_row_background" AS ENUM('transparent', 'white', 'neutral-900', 'zinc-50', 'panel');
  CREATE TYPE "public"."enum_pages_blocks_row_padding_y" AS ENUM('', 'py-6 md:py-8', 'py-8 md:py-12', 'py-12 md:py-16', 'py-16 md:py-24');
  CREATE TYPE "public"."enum_pages_blocks_row_gap" AS ENUM('gap-0', 'gap-3 md:gap-4', 'gap-4 md:gap-6', 'gap-6 md:gap-8', 'gap-8 md:gap-12');
  CREATE TYPE "public"."enum_pages_blocks_row_align_y" AS ENUM('items-start', 'items-center', 'items-end', 'items-stretch');
  CREATE TYPE "public"."enum_pages_blocks_row_align_x" AS ENUM('justify-start', 'justify-center', 'justify-end', 'justify-between');
  CREATE TYPE "public"."enum_pages_blocks_tags_block_match_mode" AS ENUM('any', 'all');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_grid_source" AS ENUM('latest', 'byCategory', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_grid_locale" AS ENUM('es', 'en', 'pt');
  CREATE TYPE "public"."enum__pages_v_blocks_category_menu_source" AS ENUM('all', 'selected');
  CREATE TYPE "public"."enum__pages_v_blocks_row_cells_v_align" AS ENUM('self-stretch', 'self-start', 'self-center', 'self-end');
  CREATE TYPE "public"."enum__pages_v_blocks_row_max_width" AS ENUM('lg', 'xl', '2xl', '7xl', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_row_background" AS ENUM('transparent', 'white', 'neutral-900', 'zinc-50', 'panel');
  CREATE TYPE "public"."enum__pages_v_blocks_row_padding_y" AS ENUM('', 'py-6 md:py-8', 'py-8 md:py-12', 'py-12 md:py-16', 'py-16 md:py-24');
  CREATE TYPE "public"."enum__pages_v_blocks_row_gap" AS ENUM('gap-0', 'gap-3 md:gap-4', 'gap-4 md:gap-6', 'gap-6 md:gap-8', 'gap-8 md:gap-12');
  CREATE TYPE "public"."enum__pages_v_blocks_row_align_y" AS ENUM('items-start', 'items-center', 'items-end', 'items-stretch');
  CREATE TYPE "public"."enum__pages_v_blocks_row_align_x" AS ENUM('justify-start', 'justify-center', 'justify-end', 'justify-between');
  CREATE TYPE "public"."enum__pages_v_blocks_tags_block_match_mode" AS ENUM('any', 'all');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_blocks_hero_media_type" AS ENUM('image', 'video', 'videoUrl');
  CREATE TYPE "public"."enum_posts_blocks_hero_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_posts_blocks_image_display" AS ENUM('inline', 'full');
  CREATE TYPE "public"."enum_posts_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum_posts_blocks_embed_provider" AS ENUM('youtube', 'x', 'tiktok', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_related_posts_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_template_preset" AS ENUM('classic', 'explainer', 'timeline', 'multimedia', 'opinion');
  CREATE TYPE "public"."enum_posts_seo_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum_posts_seo_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum_posts_seo_open_graph_og_type" AS ENUM('article', 'website');
  CREATE TYPE "public"."enum_posts_seo_twitter_card" AS ENUM('summary', 'summary_large_image');
  CREATE TYPE "public"."enum_posts_seo_jsonld_type" AS ENUM('NewsArticle', 'Article', 'BlogPosting');
  CREATE TYPE "public"."enum_posts_seo_sitemap_changefreq" AS ENUM('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_media_type" AS ENUM('image', 'video', 'videoUrl');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__posts_v_blocks_image_display" AS ENUM('inline', 'full');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum__posts_v_blocks_embed_provider" AS ENUM('youtube', 'x', 'tiktok', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_related_posts_mode" AS ENUM('auto', 'manual');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_template_preset" AS ENUM('classic', 'explainer', 'timeline', 'multimedia', 'opinion');
  CREATE TYPE "public"."enum__posts_v_version_seo_robots_index" AS ENUM('index', 'noindex');
  CREATE TYPE "public"."enum__posts_v_version_seo_robots_follow" AS ENUM('follow', 'nofollow');
  CREATE TYPE "public"."enum__posts_v_version_seo_open_graph_og_type" AS ENUM('article', 'website');
  CREATE TYPE "public"."enum__posts_v_version_seo_twitter_card" AS ENUM('summary', 'summary_large_image');
  CREATE TYPE "public"."enum__posts_v_version_seo_jsonld_type" AS ENUM('NewsArticle', 'Article', 'BlogPosting');
  CREATE TYPE "public"."enum__posts_v_version_seo_sitemap_changefreq" AS ENUM('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"source" "enum_pages_blocks_hero_grid_source" DEFAULT 'latest',
  	"category_id" integer,
  	"limit" numeric DEFAULT 5,
  	"offset" numeric DEFAULT 0,
  	"show_dates" boolean DEFAULT true,
  	"locale" "enum_pages_blocks_hero_grid_locale" DEFAULT 'es',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_category_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"base_path" varchar DEFAULT '/category',
  	"source" "enum_pages_blocks_category_menu_source" DEFAULT 'all',
  	"max_categories" numeric DEFAULT 20,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_perspective_economy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_row_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"v_align" "enum_pages_blocks_row_cells_v_align" DEFAULT 'self-stretch',
  	"base" numeric DEFAULT 1,
  	"sm" numeric DEFAULT 1,
  	"md" numeric DEFAULT 1,
  	"lg" numeric DEFAULT 1,
  	"xl" numeric DEFAULT 1
  );
  
  CREATE TABLE "pages_blocks_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"as_container" boolean DEFAULT true,
  	"max_width" "enum_pages_blocks_row_max_width" DEFAULT '7xl',
  	"background" "enum_pages_blocks_row_background" DEFAULT 'transparent',
  	"padding_y" "enum_pages_blocks_row_padding_y" DEFAULT 'py-8 md:py-12',
  	"gap" "enum_pages_blocks_row_gap" DEFAULT 'gap-6 md:gap-8',
  	"align_y" "enum_pages_blocks_row_align_y" DEFAULT 'items-start',
  	"align_x" "enum_pages_blocks_row_align_x" DEFAULT 'justify-start',
  	"cols_base" numeric DEFAULT 1,
  	"cols_sm" numeric,
  	"cols_md" numeric,
  	"cols_lg" numeric,
  	"cols_xl" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_with_sidebar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_category_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tags_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"match_mode" "enum_pages_blocks_tags_block_match_mode" DEFAULT 'any',
  	"title" varchar,
  	"right_count" numeric DEFAULT 5,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_single_tag_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"data" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"source" "enum__pages_v_blocks_hero_grid_source" DEFAULT 'latest',
  	"category_id" integer,
  	"limit" numeric DEFAULT 5,
  	"offset" numeric DEFAULT 0,
  	"show_dates" boolean DEFAULT true,
  	"locale" "enum__pages_v_blocks_hero_grid_locale" DEFAULT 'es',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_category_menu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"base_path" varchar DEFAULT '/category',
  	"source" "enum__pages_v_blocks_category_menu_source" DEFAULT 'all',
  	"max_categories" numeric DEFAULT 20,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_perspective_economy" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_row_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"v_align" "enum__pages_v_blocks_row_cells_v_align" DEFAULT 'self-stretch',
  	"base" numeric DEFAULT 1,
  	"sm" numeric DEFAULT 1,
  	"md" numeric DEFAULT 1,
  	"lg" numeric DEFAULT 1,
  	"xl" numeric DEFAULT 1,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_row" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"as_container" boolean DEFAULT true,
  	"max_width" "enum__pages_v_blocks_row_max_width" DEFAULT '7xl',
  	"background" "enum__pages_v_blocks_row_background" DEFAULT 'transparent',
  	"padding_y" "enum__pages_v_blocks_row_padding_y" DEFAULT 'py-8 md:py-12',
  	"gap" "enum__pages_v_blocks_row_gap" DEFAULT 'gap-6 md:gap-8',
  	"align_y" "enum__pages_v_blocks_row_align_y" DEFAULT 'items-start',
  	"align_x" "enum__pages_v_blocks_row_align_x" DEFAULT 'justify-start',
  	"cols_base" numeric DEFAULT 1,
  	"cols_sm" numeric,
  	"cols_md" numeric,
  	"cols_lg" numeric,
  	"cols_xl" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_with_sidebar" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_category_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tags_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"match_mode" "enum__pages_v_blocks_tags_block_match_mode" DEFAULT 'any',
  	"title" varchar,
  	"right_count" numeric DEFAULT 5,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_single_tag_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "posts_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"overline" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"media_type" "enum_posts_blocks_hero_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"video_url" varchar,
  	"align" "enum_posts_blocks_hero_align" DEFAULT 'center',
  	"dark_overlay" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"data" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"author" varchar,
  	"source" varchar,
  	"emphasis" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"display" "enum_posts_blocks_image_display" DEFAULT 'inline',
  	"caption" varchar,
  	"credit" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "posts_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_posts_blocks_gallery_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_facts_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_blocks_facts_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Lo clave en 30s',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"title" varchar,
  	"summary" varchar
  );
  
  CREATE TABLE "posts_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"provider" "enum_posts_blocks_embed_provider" DEFAULT 'youtube',
  	"url" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_related_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"mode" "enum_posts_blocks_related_posts_mode" DEFAULT 'auto',
  	"limit" numeric DEFAULT 4,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"status" "enum_posts_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"template_preset" "enum_posts_template_preset" DEFAULT 'classic',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_keywords" varchar,
  	"seo_canonical" varchar,
  	"seo_robots_index" "enum_posts_seo_robots_index" DEFAULT 'index',
  	"seo_robots_follow" "enum_posts_seo_robots_follow" DEFAULT 'follow',
  	"seo_robots_advanced" boolean DEFAULT false,
  	"seo_open_graph_og_title" varchar,
  	"seo_open_graph_og_description" varchar,
  	"seo_open_graph_og_image_id" integer,
  	"seo_open_graph_og_type" "enum_posts_seo_open_graph_og_type" DEFAULT 'article',
  	"seo_open_graph_og_site_name" varchar DEFAULT 'Diario en Contexto',
  	"seo_open_graph_og_locale" varchar DEFAULT 'es_MX',
  	"seo_twitter_card" "enum_posts_seo_twitter_card" DEFAULT 'summary_large_image',
  	"seo_twitter_title" varchar,
  	"seo_twitter_description" varchar,
  	"seo_twitter_image_id" integer,
  	"seo_twitter_creator" varchar,
  	"seo_jsonld_enable" boolean DEFAULT true,
  	"seo_jsonld_type" "enum_posts_seo_jsonld_type" DEFAULT 'NewsArticle',
  	"seo_jsonld_headline" varchar,
  	"seo_jsonld_image_id" integer,
  	"seo_sitemap_exclude" boolean DEFAULT false,
  	"seo_sitemap_changefreq" "enum_posts_seo_sitemap_changefreq" DEFAULT 'daily',
  	"seo_sitemap_priority" numeric DEFAULT 0.8,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "_posts_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"overline" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"media_type" "enum__posts_v_blocks_hero_media_type" DEFAULT 'image',
  	"image_id" integer,
  	"video_id" integer,
  	"video_url" varchar,
  	"align" "enum__posts_v_blocks_hero_align" DEFAULT 'center',
  	"dark_overlay" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"data" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"author" varchar,
  	"source" varchar,
  	"emphasis" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"display" "enum__posts_v_blocks_image_display" DEFAULT 'inline',
  	"caption" varchar,
  	"credit" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__posts_v_blocks_gallery_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_facts_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_facts_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Lo clave en 30s',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"title" varchar,
  	"summary" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"provider" "enum__posts_v_blocks_embed_provider" DEFAULT 'youtube',
  	"url" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_related_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"mode" "enum__posts_v_blocks_related_posts_mode" DEFAULT 'auto',
  	"limit" numeric DEFAULT 4,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"version_published_at" timestamp(3) with time zone,
  	"version_template_preset" "enum__posts_v_version_template_preset" DEFAULT 'classic',
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"version_seo_keywords" varchar,
  	"version_seo_canonical" varchar,
  	"version_seo_robots_index" "enum__posts_v_version_seo_robots_index" DEFAULT 'index',
  	"version_seo_robots_follow" "enum__posts_v_version_seo_robots_follow" DEFAULT 'follow',
  	"version_seo_robots_advanced" boolean DEFAULT false,
  	"version_seo_open_graph_og_title" varchar,
  	"version_seo_open_graph_og_description" varchar,
  	"version_seo_open_graph_og_image_id" integer,
  	"version_seo_open_graph_og_type" "enum__posts_v_version_seo_open_graph_og_type" DEFAULT 'article',
  	"version_seo_open_graph_og_site_name" varchar DEFAULT 'Diario en Contexto',
  	"version_seo_open_graph_og_locale" varchar DEFAULT 'es_MX',
  	"version_seo_twitter_card" "enum__posts_v_version_seo_twitter_card" DEFAULT 'summary_large_image',
  	"version_seo_twitter_title" varchar,
  	"version_seo_twitter_description" varchar,
  	"version_seo_twitter_image_id" integer,
  	"version_seo_twitter_creator" varchar,
  	"version_seo_jsonld_enable" boolean DEFAULT true,
  	"version_seo_jsonld_type" "enum__posts_v_version_seo_jsonld_type" DEFAULT 'NewsArticle',
  	"version_seo_jsonld_headline" varchar,
  	"version_seo_jsonld_image_id" integer,
  	"version_seo_sitemap_exclude" boolean DEFAULT false,
  	"version_seo_sitemap_changefreq" "enum__posts_v_version_seo_sitemap_changefreq" DEFAULT 'daily',
  	"version_seo_sitemap_priority" numeric DEFAULT 0.8,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_square_url" varchar,
  	"sizes_square_width" numeric,
  	"sizes_square_height" numeric,
  	"sizes_square_mime_type" varchar,
  	"sizes_square_filesize" numeric,
  	"sizes_square_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"users_id" integer,
  	"redirects_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"search_id" integer,
  	"payload_jobs_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "home_highlights" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Recientes',
  	"background_id" integer,
  	"count" numeric DEFAULT 4 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_grid" ADD CONSTRAINT "pages_blocks_hero_grid_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_grid" ADD CONSTRAINT "pages_blocks_hero_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_menu" ADD CONSTRAINT "pages_blocks_category_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_perspective_economy" ADD CONSTRAINT "pages_blocks_perspective_economy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_row_cells" ADD CONSTRAINT "pages_blocks_row_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_row" ADD CONSTRAINT "pages_blocks_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_with_sidebar" ADD CONSTRAINT "pages_blocks_feature_with_sidebar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_block" ADD CONSTRAINT "pages_blocks_category_block_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_category_block" ADD CONSTRAINT "pages_blocks_category_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tags_block" ADD CONSTRAINT "pages_blocks_tags_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_single_tag_block" ADD CONSTRAINT "pages_blocks_single_tag_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_texts" ADD CONSTRAINT "pages_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_grid" ADD CONSTRAINT "_pages_v_blocks_hero_grid_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_grid" ADD CONSTRAINT "_pages_v_blocks_hero_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_category_menu" ADD CONSTRAINT "_pages_v_blocks_category_menu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_perspective_economy" ADD CONSTRAINT "_pages_v_blocks_perspective_economy_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_row_cells" ADD CONSTRAINT "_pages_v_blocks_row_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_row"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_row" ADD CONSTRAINT "_pages_v_blocks_row_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_with_sidebar" ADD CONSTRAINT "_pages_v_blocks_feature_with_sidebar_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_category_block" ADD CONSTRAINT "_pages_v_blocks_category_block_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_category_block" ADD CONSTRAINT "_pages_v_blocks_category_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tags_block" ADD CONSTRAINT "_pages_v_blocks_tags_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_single_tag_block" ADD CONSTRAINT "_pages_v_blocks_single_tag_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_texts" ADD CONSTRAINT "_pages_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_rich_text" ADD CONSTRAINT "posts_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_quote" ADD CONSTRAINT "posts_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_image" ADD CONSTRAINT "posts_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_image" ADD CONSTRAINT "posts_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_items" ADD CONSTRAINT "posts_blocks_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_items" ADD CONSTRAINT "posts_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery" ADD CONSTRAINT "posts_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_facts_list_items" ADD CONSTRAINT "posts_blocks_facts_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_facts_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_facts_list" ADD CONSTRAINT "posts_blocks_facts_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_timeline_events" ADD CONSTRAINT "posts_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_timeline" ADD CONSTRAINT "posts_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_embed" ADD CONSTRAINT "posts_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_related_posts" ADD CONSTRAINT "posts_blocks_related_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_seo_jsonld_image_id_media_id_fk" FOREIGN KEY ("seo_jsonld_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_texts" ADD CONSTRAINT "posts_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_rich_text" ADD CONSTRAINT "_posts_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_quote" ADD CONSTRAINT "_posts_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image" ADD CONSTRAINT "_posts_v_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_image" ADD CONSTRAINT "_posts_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_items" ADD CONSTRAINT "_posts_v_blocks_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_items" ADD CONSTRAINT "_posts_v_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery" ADD CONSTRAINT "_posts_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_facts_list_items" ADD CONSTRAINT "_posts_v_blocks_facts_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_facts_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_facts_list" ADD CONSTRAINT "_posts_v_blocks_facts_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_timeline_events" ADD CONSTRAINT "_posts_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_timeline" ADD CONSTRAINT "_posts_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_embed" ADD CONSTRAINT "_posts_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_related_posts" ADD CONSTRAINT "_posts_v_blocks_related_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_open_graph_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_open_graph_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_twitter_image_id_media_id_fk" FOREIGN KEY ("version_seo_twitter_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_seo_jsonld_image_id_media_id_fk" FOREIGN KEY ("version_seo_jsonld_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_texts" ADD CONSTRAINT "_posts_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_highlights" ADD CONSTRAINT "home_highlights_background_id_media_id_fk" FOREIGN KEY ("background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_grid_order_idx" ON "pages_blocks_hero_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_grid_parent_id_idx" ON "pages_blocks_hero_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_grid_path_idx" ON "pages_blocks_hero_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_grid_category_idx" ON "pages_blocks_hero_grid" USING btree ("category_id");
  CREATE INDEX "pages_blocks_category_menu_order_idx" ON "pages_blocks_category_menu" USING btree ("_order");
  CREATE INDEX "pages_blocks_category_menu_parent_id_idx" ON "pages_blocks_category_menu" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_category_menu_path_idx" ON "pages_blocks_category_menu" USING btree ("_path");
  CREATE INDEX "pages_blocks_perspective_economy_order_idx" ON "pages_blocks_perspective_economy" USING btree ("_order");
  CREATE INDEX "pages_blocks_perspective_economy_parent_id_idx" ON "pages_blocks_perspective_economy" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_perspective_economy_path_idx" ON "pages_blocks_perspective_economy" USING btree ("_path");
  CREATE INDEX "pages_blocks_row_cells_order_idx" ON "pages_blocks_row_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_row_cells_parent_id_idx" ON "pages_blocks_row_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_row_order_idx" ON "pages_blocks_row" USING btree ("_order");
  CREATE INDEX "pages_blocks_row_parent_id_idx" ON "pages_blocks_row" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_row_path_idx" ON "pages_blocks_row" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_with_sidebar_order_idx" ON "pages_blocks_feature_with_sidebar" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_with_sidebar_parent_id_idx" ON "pages_blocks_feature_with_sidebar" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_with_sidebar_path_idx" ON "pages_blocks_feature_with_sidebar" USING btree ("_path");
  CREATE INDEX "pages_blocks_category_block_order_idx" ON "pages_blocks_category_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_category_block_parent_id_idx" ON "pages_blocks_category_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_category_block_path_idx" ON "pages_blocks_category_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_category_block_category_idx" ON "pages_blocks_category_block" USING btree ("category_id");
  CREATE INDEX "pages_blocks_tags_block_order_idx" ON "pages_blocks_tags_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_tags_block_parent_id_idx" ON "pages_blocks_tags_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tags_block_path_idx" ON "pages_blocks_tags_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_single_tag_block_order_idx" ON "pages_blocks_single_tag_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_single_tag_block_parent_id_idx" ON "pages_blocks_single_tag_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_single_tag_block_path_idx" ON "pages_blocks_single_tag_block" USING btree ("_path");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_texts_order_parent_idx" ON "pages_texts" USING btree ("order","parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_grid_order_idx" ON "_pages_v_blocks_hero_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_grid_parent_id_idx" ON "_pages_v_blocks_hero_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_grid_path_idx" ON "_pages_v_blocks_hero_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_grid_category_idx" ON "_pages_v_blocks_hero_grid" USING btree ("category_id");
  CREATE INDEX "_pages_v_blocks_category_menu_order_idx" ON "_pages_v_blocks_category_menu" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_category_menu_parent_id_idx" ON "_pages_v_blocks_category_menu" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_category_menu_path_idx" ON "_pages_v_blocks_category_menu" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_perspective_economy_order_idx" ON "_pages_v_blocks_perspective_economy" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_perspective_economy_parent_id_idx" ON "_pages_v_blocks_perspective_economy" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_perspective_economy_path_idx" ON "_pages_v_blocks_perspective_economy" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_row_cells_order_idx" ON "_pages_v_blocks_row_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_row_cells_parent_id_idx" ON "_pages_v_blocks_row_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_row_order_idx" ON "_pages_v_blocks_row" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_row_parent_id_idx" ON "_pages_v_blocks_row" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_row_path_idx" ON "_pages_v_blocks_row" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_with_sidebar_order_idx" ON "_pages_v_blocks_feature_with_sidebar" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_with_sidebar_parent_id_idx" ON "_pages_v_blocks_feature_with_sidebar" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_with_sidebar_path_idx" ON "_pages_v_blocks_feature_with_sidebar" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_category_block_order_idx" ON "_pages_v_blocks_category_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_category_block_parent_id_idx" ON "_pages_v_blocks_category_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_category_block_path_idx" ON "_pages_v_blocks_category_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_category_block_category_idx" ON "_pages_v_blocks_category_block" USING btree ("category_id");
  CREATE INDEX "_pages_v_blocks_tags_block_order_idx" ON "_pages_v_blocks_tags_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tags_block_parent_id_idx" ON "_pages_v_blocks_tags_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tags_block_path_idx" ON "_pages_v_blocks_tags_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_single_tag_block_order_idx" ON "_pages_v_blocks_single_tag_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_single_tag_block_parent_id_idx" ON "_pages_v_blocks_single_tag_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_single_tag_block_path_idx" ON "_pages_v_blocks_single_tag_block" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_texts_order_parent_idx" ON "_pages_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "posts_blocks_hero_order_idx" ON "posts_blocks_hero" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_parent_id_idx" ON "posts_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_path_idx" ON "posts_blocks_hero" USING btree ("_path");
  CREATE INDEX "posts_blocks_hero_image_idx" ON "posts_blocks_hero" USING btree ("image_id");
  CREATE INDEX "posts_blocks_hero_video_idx" ON "posts_blocks_hero" USING btree ("video_id");
  CREATE INDEX "posts_blocks_rich_text_order_idx" ON "posts_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "posts_blocks_rich_text_parent_id_idx" ON "posts_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_rich_text_path_idx" ON "posts_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "posts_blocks_quote_order_idx" ON "posts_blocks_quote" USING btree ("_order");
  CREATE INDEX "posts_blocks_quote_parent_id_idx" ON "posts_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_quote_path_idx" ON "posts_blocks_quote" USING btree ("_path");
  CREATE INDEX "posts_blocks_image_order_idx" ON "posts_blocks_image" USING btree ("_order");
  CREATE INDEX "posts_blocks_image_parent_id_idx" ON "posts_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_image_path_idx" ON "posts_blocks_image" USING btree ("_path");
  CREATE INDEX "posts_blocks_image_image_idx" ON "posts_blocks_image" USING btree ("image_id");
  CREATE INDEX "posts_blocks_gallery_items_order_idx" ON "posts_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_items_parent_id_idx" ON "posts_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_items_image_idx" ON "posts_blocks_gallery_items" USING btree ("image_id");
  CREATE INDEX "posts_blocks_gallery_order_idx" ON "posts_blocks_gallery" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_parent_id_idx" ON "posts_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_path_idx" ON "posts_blocks_gallery" USING btree ("_path");
  CREATE INDEX "posts_blocks_facts_list_items_order_idx" ON "posts_blocks_facts_list_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_facts_list_items_parent_id_idx" ON "posts_blocks_facts_list_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_facts_list_order_idx" ON "posts_blocks_facts_list" USING btree ("_order");
  CREATE INDEX "posts_blocks_facts_list_parent_id_idx" ON "posts_blocks_facts_list" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_facts_list_path_idx" ON "posts_blocks_facts_list" USING btree ("_path");
  CREATE INDEX "posts_blocks_timeline_events_order_idx" ON "posts_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "posts_blocks_timeline_events_parent_id_idx" ON "posts_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_timeline_order_idx" ON "posts_blocks_timeline" USING btree ("_order");
  CREATE INDEX "posts_blocks_timeline_parent_id_idx" ON "posts_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_timeline_path_idx" ON "posts_blocks_timeline" USING btree ("_path");
  CREATE INDEX "posts_blocks_embed_order_idx" ON "posts_blocks_embed" USING btree ("_order");
  CREATE INDEX "posts_blocks_embed_parent_id_idx" ON "posts_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_embed_path_idx" ON "posts_blocks_embed" USING btree ("_path");
  CREATE INDEX "posts_blocks_related_posts_order_idx" ON "posts_blocks_related_posts" USING btree ("_order");
  CREATE INDEX "posts_blocks_related_posts_parent_id_idx" ON "posts_blocks_related_posts" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_related_posts_path_idx" ON "posts_blocks_related_posts" USING btree ("_path");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_seo_open_graph_seo_open_graph_og_image_idx" ON "posts" USING btree ("seo_open_graph_og_image_id");
  CREATE INDEX "posts_seo_twitter_seo_twitter_image_idx" ON "posts" USING btree ("seo_twitter_image_id");
  CREATE INDEX "posts_seo_jsonld_seo_jsonld_image_idx" ON "posts" USING btree ("seo_jsonld_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_texts_order_parent_idx" ON "posts_texts" USING btree ("order","parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_blocks_hero_order_idx" ON "_posts_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_parent_id_idx" ON "_posts_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_path_idx" ON "_posts_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_hero_image_idx" ON "_posts_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_hero_video_idx" ON "_posts_v_blocks_hero" USING btree ("video_id");
  CREATE INDEX "_posts_v_blocks_rich_text_order_idx" ON "_posts_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_rich_text_parent_id_idx" ON "_posts_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_rich_text_path_idx" ON "_posts_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_quote_order_idx" ON "_posts_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_quote_parent_id_idx" ON "_posts_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_quote_path_idx" ON "_posts_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_image_order_idx" ON "_posts_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_image_parent_id_idx" ON "_posts_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_image_path_idx" ON "_posts_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_image_image_idx" ON "_posts_v_blocks_image" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_gallery_items_order_idx" ON "_posts_v_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_items_parent_id_idx" ON "_posts_v_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_items_image_idx" ON "_posts_v_blocks_gallery_items" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_gallery_order_idx" ON "_posts_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_parent_id_idx" ON "_posts_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_path_idx" ON "_posts_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_facts_list_items_order_idx" ON "_posts_v_blocks_facts_list_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_facts_list_items_parent_id_idx" ON "_posts_v_blocks_facts_list_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_facts_list_order_idx" ON "_posts_v_blocks_facts_list" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_facts_list_parent_id_idx" ON "_posts_v_blocks_facts_list" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_facts_list_path_idx" ON "_posts_v_blocks_facts_list" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_timeline_events_order_idx" ON "_posts_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_timeline_events_parent_id_idx" ON "_posts_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_timeline_order_idx" ON "_posts_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_timeline_parent_id_idx" ON "_posts_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_timeline_path_idx" ON "_posts_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_embed_order_idx" ON "_posts_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_embed_parent_id_idx" ON "_posts_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_embed_path_idx" ON "_posts_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_related_posts_order_idx" ON "_posts_v_blocks_related_posts" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_related_posts_parent_id_idx" ON "_posts_v_blocks_related_posts" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_related_posts_path_idx" ON "_posts_v_blocks_related_posts" USING btree ("_path");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_seo_open_graph_version_seo_open_graph_o_idx" ON "_posts_v" USING btree ("version_seo_open_graph_og_image_id");
  CREATE INDEX "_posts_v_version_seo_twitter_version_seo_twitter_image_idx" ON "_posts_v" USING btree ("version_seo_twitter_image_id");
  CREATE INDEX "_posts_v_version_seo_jsonld_version_seo_jsonld_image_idx" ON "_posts_v" USING btree ("version_seo_jsonld_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_texts_order_parent_idx" ON "_posts_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "home_highlights_background_idx" ON "home_highlights" USING btree ("background_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages_blocks_hero_grid" CASCADE;
  DROP TABLE "pages_blocks_category_menu" CASCADE;
  DROP TABLE "pages_blocks_perspective_economy" CASCADE;
  DROP TABLE "pages_blocks_row_cells" CASCADE;
  DROP TABLE "pages_blocks_row" CASCADE;
  DROP TABLE "pages_blocks_feature_with_sidebar" CASCADE;
  DROP TABLE "pages_blocks_category_block" CASCADE;
  DROP TABLE "pages_blocks_tags_block" CASCADE;
  DROP TABLE "pages_blocks_single_tag_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_texts" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_category_menu" CASCADE;
  DROP TABLE "_pages_v_blocks_perspective_economy" CASCADE;
  DROP TABLE "_pages_v_blocks_row_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_row" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_with_sidebar" CASCADE;
  DROP TABLE "_pages_v_blocks_category_block" CASCADE;
  DROP TABLE "_pages_v_blocks_tags_block" CASCADE;
  DROP TABLE "_pages_v_blocks_single_tag_block" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_texts" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_blocks_hero" CASCADE;
  DROP TABLE "posts_blocks_rich_text" CASCADE;
  DROP TABLE "posts_blocks_quote" CASCADE;
  DROP TABLE "posts_blocks_image" CASCADE;
  DROP TABLE "posts_blocks_gallery_items" CASCADE;
  DROP TABLE "posts_blocks_gallery" CASCADE;
  DROP TABLE "posts_blocks_facts_list_items" CASCADE;
  DROP TABLE "posts_blocks_facts_list" CASCADE;
  DROP TABLE "posts_blocks_timeline_events" CASCADE;
  DROP TABLE "posts_blocks_timeline" CASCADE;
  DROP TABLE "posts_blocks_embed" CASCADE;
  DROP TABLE "posts_blocks_related_posts" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_texts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_blocks_hero" CASCADE;
  DROP TABLE "_posts_v_blocks_rich_text" CASCADE;
  DROP TABLE "_posts_v_blocks_quote" CASCADE;
  DROP TABLE "_posts_v_blocks_image" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery_items" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_facts_list_items" CASCADE;
  DROP TABLE "_posts_v_blocks_facts_list" CASCADE;
  DROP TABLE "_posts_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_posts_v_blocks_timeline" CASCADE;
  DROP TABLE "_posts_v_blocks_embed" CASCADE;
  DROP TABLE "_posts_v_blocks_related_posts" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_texts" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "home_highlights" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_blocks_hero_grid_source";
  DROP TYPE "public"."enum_pages_blocks_hero_grid_locale";
  DROP TYPE "public"."enum_pages_blocks_category_menu_source";
  DROP TYPE "public"."enum_pages_blocks_row_cells_v_align";
  DROP TYPE "public"."enum_pages_blocks_row_max_width";
  DROP TYPE "public"."enum_pages_blocks_row_background";
  DROP TYPE "public"."enum_pages_blocks_row_padding_y";
  DROP TYPE "public"."enum_pages_blocks_row_gap";
  DROP TYPE "public"."enum_pages_blocks_row_align_y";
  DROP TYPE "public"."enum_pages_blocks_row_align_x";
  DROP TYPE "public"."enum_pages_blocks_tags_block_match_mode";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_hero_grid_source";
  DROP TYPE "public"."enum__pages_v_blocks_hero_grid_locale";
  DROP TYPE "public"."enum__pages_v_blocks_category_menu_source";
  DROP TYPE "public"."enum__pages_v_blocks_row_cells_v_align";
  DROP TYPE "public"."enum__pages_v_blocks_row_max_width";
  DROP TYPE "public"."enum__pages_v_blocks_row_background";
  DROP TYPE "public"."enum__pages_v_blocks_row_padding_y";
  DROP TYPE "public"."enum__pages_v_blocks_row_gap";
  DROP TYPE "public"."enum__pages_v_blocks_row_align_y";
  DROP TYPE "public"."enum__pages_v_blocks_row_align_x";
  DROP TYPE "public"."enum__pages_v_blocks_tags_block_match_mode";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_blocks_hero_media_type";
  DROP TYPE "public"."enum_posts_blocks_hero_align";
  DROP TYPE "public"."enum_posts_blocks_image_display";
  DROP TYPE "public"."enum_posts_blocks_gallery_layout";
  DROP TYPE "public"."enum_posts_blocks_embed_provider";
  DROP TYPE "public"."enum_posts_blocks_related_posts_mode";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum_posts_template_preset";
  DROP TYPE "public"."enum_posts_seo_robots_index";
  DROP TYPE "public"."enum_posts_seo_robots_follow";
  DROP TYPE "public"."enum_posts_seo_open_graph_og_type";
  DROP TYPE "public"."enum_posts_seo_twitter_card";
  DROP TYPE "public"."enum_posts_seo_jsonld_type";
  DROP TYPE "public"."enum_posts_seo_sitemap_changefreq";
  DROP TYPE "public"."enum__posts_v_blocks_hero_media_type";
  DROP TYPE "public"."enum__posts_v_blocks_hero_align";
  DROP TYPE "public"."enum__posts_v_blocks_image_display";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__posts_v_blocks_embed_provider";
  DROP TYPE "public"."enum__posts_v_blocks_related_posts_mode";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_version_template_preset";
  DROP TYPE "public"."enum__posts_v_version_seo_robots_index";
  DROP TYPE "public"."enum__posts_v_version_seo_robots_follow";
  DROP TYPE "public"."enum__posts_v_version_seo_open_graph_og_type";
  DROP TYPE "public"."enum__posts_v_version_seo_twitter_card";
  DROP TYPE "public"."enum__posts_v_version_seo_jsonld_type";
  DROP TYPE "public"."enum__posts_v_version_seo_sitemap_changefreq";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_link_type";
  DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}
