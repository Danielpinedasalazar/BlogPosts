import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1754402132194 implements MigrationInterface {
  name = 'FirstMigration1754402132194';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."upload_type_enum" AS ENUM('image')`,
    );
    await queryRunner.query(
      `CREATE TABLE "upload" ("id" SERIAL NOT NULL, "name" character varying(1024) NOT NULL, "path" character varying(1024) NOT NULL, "type" "public"."upload_type_enum" NOT NULL DEFAULT 'image', "mime" character varying(128) NOT NULL, "size" character varying(1024) NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "featuredImageUrl"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "createdDate"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "updatedDate"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "featuredImage" character varying(1024)`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "createDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "updateDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "googleId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ALTER COLUMN "name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "UQ_3413aed3ecde54f832c4f44f045"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "slug" character varying(512) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "UQ_3413aed3ecde54f832c4f44f045" UNIQUE ("slug")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" DROP CONSTRAINT "UQ_3413aed3ecde54f832c4f44f045"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "slug" character varying(256) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD CONSTRAINT "UQ_3413aed3ecde54f832c4f44f045" UNIQUE ("slug")`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "updateDate"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "createDate"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "featuredImage"`);
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tag" ADD "featuredImageUrl" character varying(1024)`,
    );
    await queryRunner.query(`DROP TABLE "upload"`);
    await queryRunner.query(`DROP TYPE "public"."upload_type_enum"`);
  }
}
