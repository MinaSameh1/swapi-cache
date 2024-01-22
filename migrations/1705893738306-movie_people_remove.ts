import { MigrationInterface, QueryRunner } from 'typeorm'

export class MoviePeopleRemove1705893738306 implements MigrationInterface {
  name = 'MoviePeopleRemove1705893738306'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movie_person"`)
    await queryRunner.query(
      `ALTER TABLE "person" RENAME COLUMN "moviesUrls" TO "moviesIds"`,
    )
    await queryRunner.query(
      `ALTER TABLE "movie" ADD "charactersUrl" text[] NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "charactersUrl"`)
    await queryRunner.query(
      `ALTER TABLE "person" RENAME COLUMN "moviesIds" TO "moviesUrls"`,
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
}
