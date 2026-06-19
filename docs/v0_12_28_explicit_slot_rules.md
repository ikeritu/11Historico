# v0.12.28 — Slot Rules Explicit Map

## Problema

Julen Guerrero aparecía como compatible en `DC` aunque su perfil visible era:

```text
MP / MC-I / MC-D
```

Eso no debe pasar.

## Causa

El motor de v0.12.26 expandía posiciones de forma transitiva.

Ejemplo:

```text
Slot DC acepta DC / SD
SD acepta SD / MP / DC
Resultado incorrecto: MP acaba entrando como DC
```

La regla que falla no es Julen Guerrero, sino la herencia indirecta entre perfiles.

## Solución

Se elimina la expansión transitiva.

Ahora cada slot tiene un mapa explícito de perfiles aceptados.

## Reglas clave

```text
DC  -> DC / SD
SD  -> SD / MP / DC
MP  -> MP / SD / MC

MD  -> MD
MI  -> MI

ED  -> ED / MD
EI  -> EI / MI

MCD -> MCD / MC / MC-C
MC  -> MC / MC-I / MC-C / MC-D / MCD
```

Con esto:

```text
Julen Guerrero MP / MC-I / MC-D -> NO encaja en DC
Ziganda DC -> SI encaja en DC
Un jugador SD / DC -> SI encaja en DC
Un jugador MP / SD -> puede ir a SD/MP, pero no hereda DC salvo que tenga SD real
```

## Archivos modificados

```text
src/domain/positionRules.ts
```

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-28-explicit-slot-rules.ps1
npm.cmd run build
npm.cmd run dev
```

## QA recomendado

```text
Julen Guerrero MP / MC-I / MC-D con hueco DC -> no debe salir DC.
Ziganda DC con hueco DC -> debe salir DC.
Aduriz DC con hueco DC -> debe salir DC.
Ander Herrera MC-I / MC-D / MCD con hueco MC -> debe poder colocarse.
Roberto MC / MP con hueco MCD -> debe poder colocarse si tiene MC real.
Endika ED / DC con hueco MD -> no debe colocarse en MD si no tiene MD.
Susaeta ED / MD con hueco MD -> debe colocarse.
```
