# Reproduction of Admin UI route issue: 
- https://github.com/medusajs/medusa/issues/10797

- Admin UI routes doesn't exist in the sidebar on the production build.

```sh
# Command used to start production build
medusa build  
cp .env.prod .medusa/server/.env
cd .medusa/server
pnpm install
pnpm start

```
- It is working on the dev server.
```sh
# Command used to start dev server
pnpm dev
```



==========================
## Initial DB setup after clone

```sh
pnpm db-init
```

## PM2 startup

```sh

npm install -g pm2
cd /path/to/tb-store
npx medusa build
cp .env.prod .medusa/server/.env
cd .medusa/server
pnpm install
pm2 start "pnpm start" --name medusa-backend
pm2 list

sudo ufw allow 9000

```

## Storefront

```sh
cd /path/to/tb-store-front
pm2 start "yarn start" --name medusa-storefront
pm2 save
```

## Make PM2 Persistent

```sh
pm2 startup
pm2 save
```