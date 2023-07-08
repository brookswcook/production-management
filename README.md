# Production schedule contol app

## Manage monorepo packages with lerna

```sh
# add to all packages
npx lerna add react
npx lerna add react --dev

# add to specific package
npx lerna add react --scope=dashboard-front-end

# run command in all packages
npx lerna exec -- rm -rf ./node_modules

# install root node modules
npm install

# install node modules of packages & bootstrap 
npx lerna bootstrap

# run api in dev environment
npx lerna run dev --scope=dashboard-api

# publish & generate changelog
npx lerna publish --conventional-commits

# generate bundle stats
npx lerna run build --scope=dashboard-front-end

# analyze bundle stats
npx lerna run analyze --scope=dashboard-front-end
```

## Prettier

```sh
# format the whole codebase
npm run format
```

In order to use prettier automatically in vscode - install prettier extention and set `formatOnSave` option in settings

## ESlint

```sh
# check linting
npm run lint
```

No ESlint issues or code not run through prettier should be in the codebase

## Volta

Volta is used to make sure version of Node is the consistent in dev environment. Prettier might behave differently on different versions of node.

## Changelogs

[API](https://github.com/brookswcook/production-management/blob/master/packages/dashboard-api/CHANGELOG.md)

[Core](https://github.com/brookswcook/production-management/blob/master/packages/dashboard-core/CHANGELOG.md)

[Front-end](https://github.com/brookswcook/production-management/blob/master/packages/dashboard-front-end/CHANGELOG.md)
