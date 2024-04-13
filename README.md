## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Docker Image Update. Replace [tag] with the version number.
```bash
docker build -t antspihl/eits-auditor-front:[tag] .
```
```bash
docker login
```
```bash
docker tag antspihl/eits-auditor-front:[tag] antspihl/eits-auditor-front:[tag]
```
```bash
docker push antspihl/eits-auditor-front:[tag]
```

### Pull and run the image

```bash
docker login
```
```bash
docker run -it -p 3000:3000 --rm --name eits-auditor-front antspihl/eits-auditor-front:tag
```

