import { Migration } from '@mikro-orm/migrations';

export class Migration20250103050920 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table if not exists "contact" ("id" text not null, "name" text not null, "description" text not null, "logo" text not null, "email" text not null, "phone" text not null, "address" text not null, "facebook" text not null, "ig" text not null, "x" text not null, "youtube" text not null, "others" jsonb not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "contact_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "contact" cascade;');
  }

}
