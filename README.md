# Health Easy (healtheasy-frontend)

Sistema de gerenciamento para profissionais atuantes na área da saúde.

## TO-DO List

- [X] Cannot access without 'www' (https://community.spiceworks.com/topic/244392-dns-question-access-website-without-www)
- [X] Responsive landing page on Xiaomi Redmi Note 7
- [ ] Qalendar
  - [X] On Week view mode, the year in title disappear
  - [X] On event (child) click, don't show dialog
  - [X] View mode button on mobile
  - [X] Modal to edit event is out of view (mobile)
  - [X] Set Today circle in Month view mode
  - [X] On change month, set click event listener
  - [X] Persiste view mode on change page
  - [ ] Persiste period on change page
  - [X] Change date format in date picker
- [ ] Change 'Enums' to 'Models'
- [ ] Change functions names in dateUtils
- [ ] Refactors:
  - [ ] QEditor Component
  - [ ] QForm Component

- [ ] Check if pay for plan before create an account results error
  - [X] On create account, search for same email on Profiles table, before insert the same data (check supabase trigger to update it)

- [X] Cannot access https://healtheasy.com.br/ without WWW

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production
```bash
quasar build
```


### Deploy the app to production (Github Pages)
#### ⚠️⚠️ Cuidado! Este comando envia TODAS as modificações LOCAIS para produção, sem necessidade de commit ⚠️⚠️
```bash
yarn deploy
# or
npm run deploy
```


### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
