-- Adminer 4.7.8 PostgreSQL dump

DROP TABLE IF EXISTS "products";
DROP SEQUENCE IF EXISTS products_id_seq;
CREATE SEQUENCE products_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."products" (
                                     "id" integer DEFAULT nextval('products_id_seq') NOT NULL,
                                     "type" character varying(255) NOT NULL,
                                     "color" character varying NOT NULL,
                                     "quantity" integer DEFAULT '0' NOT NULL,
                                     "price" numeric NOT NULL,
                                     "is_pair" integer DEFAULT '0' NOT NULL,
                                     "updated_at" timestamptz NOT NULL,
                                     "deleted_at" timestamptz,
                                     "created_at" timestamptz NOT NULL
) WITH (oids = false);


-- 2020-12-13 19:19:33.470913+00