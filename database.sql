CREATE DATABASE foodfydb;

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" INT,
  "image" TEXT,
  "title" TEXT,
  "ingredients" TEXT[],
  "preparation" TEXT[],
  "information" TEXT,
  "created_at" TIMESTAMP (now())
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "avatar_url" TEXT,
  "created_at" TIMESTAMP
);