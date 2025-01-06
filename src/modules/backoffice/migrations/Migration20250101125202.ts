import { Migration } from '@mikro-orm/migrations';

export class Migration20250101125202 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table if exists "ads" alter column "type" type text using ("type"::text);');
    this.addSql('alter table if exists "ads" add constraint "ads_type_check" check ("type" in (\'floating\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table if exists "ads" drop constraint if exists "ads_type_check";');

    this.addSql('alter table if exists "ads" alter column "type" type text using ("type"::text);');
  }

}
