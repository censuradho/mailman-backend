import {MigrationInterface, QueryRunner} from "typeorm";

export class root1618584051866 implements MigrationInterface {
    name = 'root1618584051866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL, "cep" character varying NOT NULL, "street" character varying NOT NULL, "street_number" character varying NOT NULL, "neighborhood" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "complement" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "training" ("id" uuid NOT NULL, "exercise" character varying NOT NULL, "series" integer NOT NULL, "repetitions" integer NOT NULL, "weight" double precision NOT NULL, "comments" character varying NOT NULL, "muscleId" uuid, "trainingSheetId" uuid, CONSTRAINT "PK_c436c96be3adf1aa439ef471427" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "muscle" ("id" uuid NOT NULL, "label" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_63e13b7d76a8712ce6bb27177f4" UNIQUE ("label"), CONSTRAINT "PK_cbce9889ea2f0fd84f740b5cbe2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "training_sheet" ("id" uuid NOT NULL, "goal" character varying NOT NULL, "weight" double precision NOT NULL, "weekly_frequency" integer NOT NULL, "comments" character varying NOT NULL, "is_evaluated" boolean NOT NULL, "revaluation" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "historicId" uuid, CONSTRAINT "PK_18ee2c488b31619a3a46015c082" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "historic_training_sheet" ("id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_363e609b50fff290de37cb8477e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "username" character varying NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "training_sheet_muscles_muscle" ("trainingSheetId" uuid NOT NULL, "muscleId" uuid NOT NULL, CONSTRAINT "PK_b7ed45cfa9118497a970b3c02cb" PRIMARY KEY ("trainingSheetId", "muscleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e18210af628a4b082487983caa" ON "training_sheet_muscles_muscle" ("trainingSheetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9091deec506780d497e73c0289" ON "training_sheet_muscles_muscle" ("muscleId") `);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_bea8be264eefb23685e14de30bc" FOREIGN KEY ("muscleId") REFERENCES "muscle"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "training" ADD CONSTRAINT "FK_409ba34f2f70eeae7abe10498b4" FOREIGN KEY ("trainingSheetId") REFERENCES "training_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "training_sheet" ADD CONSTRAINT "FK_e02daeb224af5dc73c80a80ab04" FOREIGN KEY ("historicId") REFERENCES "historic_training_sheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "training_sheet_muscles_muscle" ADD CONSTRAINT "FK_e18210af628a4b082487983caaf" FOREIGN KEY ("trainingSheetId") REFERENCES "training_sheet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "training_sheet_muscles_muscle" ADD CONSTRAINT "FK_9091deec506780d497e73c02892" FOREIGN KEY ("muscleId") REFERENCES "muscle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "training_sheet_muscles_muscle" DROP CONSTRAINT "FK_9091deec506780d497e73c02892"`);
        await queryRunner.query(`ALTER TABLE "training_sheet_muscles_muscle" DROP CONSTRAINT "FK_e18210af628a4b082487983caaf"`);
        await queryRunner.query(`ALTER TABLE "training_sheet" DROP CONSTRAINT "FK_e02daeb224af5dc73c80a80ab04"`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_409ba34f2f70eeae7abe10498b4"`);
        await queryRunner.query(`ALTER TABLE "training" DROP CONSTRAINT "FK_bea8be264eefb23685e14de30bc"`);
        await queryRunner.query(`DROP INDEX "IDX_9091deec506780d497e73c0289"`);
        await queryRunner.query(`DROP INDEX "IDX_e18210af628a4b082487983caa"`);
        await queryRunner.query(`DROP TABLE "training_sheet_muscles_muscle"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "historic_training_sheet"`);
        await queryRunner.query(`DROP TABLE "training_sheet"`);
        await queryRunner.query(`DROP TABLE "muscle"`);
        await queryRunner.query(`DROP TABLE "training"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
