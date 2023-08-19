- Create Model (User)
```
// Main command
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

// Using NPM
npm run build_api:model:generate -- --name User --attributes firstName:string,lastName:string,email:string
```

- Migration
```
// Main command
npx sequelize-cli db:migrate

// Using NPM
npm run build_api:migrate
```

- Migration
```
// Main command
npx sequelize-cli db:migrate

// Using NPM
npm run build_api:migrate
```
