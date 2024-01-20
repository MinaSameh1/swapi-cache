import { MigrationInterface, QueryRunner } from 'typeorm'

export class Inital1705755373734 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movie" (
            "id" SERIAL NOT NULL,
            "episode_id" character varying NOT NULL,
            "title" text NOT NULL,
            "opening_crawl" text NOT NULL,
            "director" text NOT NULL,
            "producer" text NOT NULL,
            "release_date" TIMESTAMP NOT NULL,
            "created" TIMESTAMP NOT NULL,
            "edited" TIMESTAMP NOT NULL,
            "url" text NOT NULL,
            "planets" text[] NOT NULL,
            "starships" text[] NOT NULL,
            "vehicles" text[] NOT NULL,
            "species" text[] NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP DEFAULT null,
            CONSTRAINT "UQ_MOVIE_EPISODE_ID" UNIQUE ("episode_id"),
            CONSTRAINT "PK_MOVIE_ID" PRIMARY KEY ("id")
        )`,
    )

    await queryRunner.query(
      `CREATE TABLE "person" (
            "id" SERIAL NOT NULL,
            "name" text NOT NULL,
            "eye_color" text NOT NULL,
            "gender" text NOT NULL,
            "hair_color" text NOT NULL,
            "height" text NOT NULL,
            "homeworld" text NOT NULL,
            "skin_color" text NOT NULL,
            "birth_year" text NOT NULL,
            "moviesUrls" text[] NOT NULL,
            "species" text[] NOT NULL,
            "starships" text[] NOT NULL,
            "vehicles" text[] NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP DEFAULT null,
            CONSTRAINT "PK_PERSON_ID" PRIMARY KEY ("id")
        )`,
    )

    await queryRunner.query(
      `CREATE TABLE "movie_person" (
            "movie_id" int NOT NULL,
            "person_id" int NOT NULL,
            CONSTRAINT "PK_MOVIE_PERSON_ID" PRIMARY KEY ("movie_id", "person_id")
        )`,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_MOVIE_PERSON_MOVIE_ID" ON "movie_person" ("movieId") `,
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_MOVIE_PERSON_PERSON_ID" ON "movie_person" ("personId") `,
    )
    await queryRunner.query(
      `ALTER TABLE "movie_person" ADD CONSTRAINT "FK_MOVIE_PERSON_MOVIE" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE "movie_person" ADD CONSTRAINT "FK_MOVIE_PERSON_PERSON" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movie_person"`)
    await queryRunner.query(`DROP TABLE "movie"`)
    await queryRunner.query(`DROP TABLE "person"`)
  }
}
