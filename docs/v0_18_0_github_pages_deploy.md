# Publicar Futbol11 en GitHub Pages

## Opción recomendada: GitHub Actions

1. Crea un repositorio nuevo en GitHub.
2. Sube el contenido de este proyecto a la raíz del repositorio.
3. En GitHub, ve a **Settings → Pages**.
4. En **Build and deployment**, elige **GitHub Actions**.
5. Haz push a la rama `main`.
6. GitHub ejecutará `.github/workflows/deploy.yml`.
7. Al terminar, la web estará publicada en la URL de GitHub Pages del repositorio.

## Comandos locales

```powershell
cd "D:\Proyectos\⚽ Futbol11"
npm.cmd install
npm.cmd run build
npm.cmd run dev
```

## Auditorías

```powershell
npm.cmd run audit:balance:100
npm.cmd run audit:copa:100
```

## Nota técnica

Vite está configurado con:

```ts
base: './'
```

Esto permite que los assets funcionen en GitHub Pages aunque el repositorio se publique como subruta, por ejemplo:

```text
https://usuario.github.io/nombre-del-repo/
```
