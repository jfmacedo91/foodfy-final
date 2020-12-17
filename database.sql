DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

DROP DATABASE IF EXISTS foodfydb;
CREATE DATABASE foodfydb;

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "title" text,
  "chef_id" int,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "avatar_url" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "recipes_files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "recipe_id" int
);

CREATE TABLE "chefs_files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL,
  "chef_id" int
);

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();