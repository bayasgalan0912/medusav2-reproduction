import { Migration } from '@mikro-orm/migrations';

export class Migration20241217110216 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "ads" ("id" text not null, "name" text not null, "text" text not null, "href" text not null, "type" text not null, "status" boolean not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "ads_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "ads" cascade;');
  }

}
