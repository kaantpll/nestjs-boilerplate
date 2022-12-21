import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from "typeorm"

export class migr1671606198622 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'profiles',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment'
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
            true
          );

          await queryRunner.createIndex(
            "profiles",
            new TableIndex({
                name: "IDX_PROFILES_NAME",
                columnNames: ["gender"],
            }),
        )


        await queryRunner.createTable(
            new Table({
              name: 'users',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment'
                
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
            true
          );

          await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "profileId",
                type: "int",
            }),
        )


        
        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["profileId"],
                referencedColumnNames: ["id"],
                referencedTableName: "profiles",
                onDelete: "CASCADE",
            }),
        )


          await queryRunner.createTable(
            new Table({
              name: 'blogs',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment'
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
            true
          );

          await queryRunner.addColumn(
            'blogs',
            new TableColumn({
              name: 'userId',
              type: 'int',
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
      


    }
  
    async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("profileId") !== -1,
        )
       
    
        await queryRunner.dropForeignKey("users", foreignKey)
        await queryRunner.dropColumn("users", "questionId")

        await queryRunner.dropTable('blogs');
        await queryRunner.dropTable("users")
        await queryRunner.dropIndex("profiles", "IDX_PROFILES_NAME")
        await queryRunner.dropTable("profiles")
    }

}
