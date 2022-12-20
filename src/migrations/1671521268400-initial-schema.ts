import { query } from 'express';
import { identity } from 'rxjs';
import {
  createQueryBuilder,
  getRepository,
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class initialSchema1671521268400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'increment',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'gender',
            type: 'varchar',
          },
          {
            name: 'photo',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'blogs',
        columns: [
          {
            name: 'id',
            type: 'increment',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'varchar',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'profiles',
        columns: [
          {
            name: 'id',
            type: 'increment',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'varchar',
          },
          {
            name: 'photo',
            type: 'varchar',
          },
        ],
      }),
    );

    // one to many: user may have multiple blogs
    await queryRunner.addColumn(
      'blogs',
      new TableColumn({
        name: 'userId',
        type: 'increment',
      }),
    );

    await queryRunner.createForeignKey(
      'blogs',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    // one to one: user has a profile
    await queryRunner.query(`SELECT id
    FROM profiles
    LEFT JOIN users
    ON profiles.id = users.id`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('blogs');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );

    await queryRunner.dropForeignKey('blogs', foreignKey);
    await queryRunner.dropColumn('blogs', 'userId');
    await queryRunner.dropTable('blogs');
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('profiles');
  }
}
