# v0.12.24 — QA fix defensa central

## Bug

La v0.12.23 mejoró el draft, pero apareció un falso positivo al completar el once:

```text
Revisa tu once antes de continuar
Javi Martinez no encaja en el perfil tactico DFC-I
```

En la práctica, Javi Martinez aparecía como:

```text
DFC-C / DFC-D / MCD
```

y estaba colocado como central izquierdo `DFC-I`.

## Diagnóstico QA

El problema no era que el jugador estuviera mal elegido, sino que la validación final era demasiado estricta con la defensa central.

Para este juego, estas etiquetas deben funcionar como una familia táctica:

```text
DFC
DFC-I
DFC-C
DFC-D
```

Si un jugador tiene cualquier variante DFC, debe poder ocupar cualquiera de los tres puestos de central.

## Cambio

Se unifica la familia de defensa central en:

- `canPlayerFillSlot`
- `getValidPositionForSlot`

## Reglas ajustadas

```text
DFC-I -> DFC / DFC-I / DFC-C / DFC-D, o LI como recurso lateral
DFC-C -> DFC / DFC-I / DFC-C / DFC-D, o MCD como recurso
DFC-D -> DFC / DFC-I / DFC-C / DFC-D, o LD como recurso lateral
```

## También se mejora texto UX

Si un jugador está bloqueado:

```text
Ya elegido
Sin hueco libre
```

en vez de mantener siempre `Seleccionar y colocar`.

## Uso

```powershell
cd "D:\Proyectos\Futbol11"
powershell -ExecutionPolicy Bypass -File .\apply-v0-12-24-dfc-family-validation-fix.ps1
npm.cmd run build
npm.cmd run dev
```

## Prueba clave

Formación 3-6-1:

```text
Javi Martinez DFC-C / DFC-D / MCD
colocado en DFC-I
```

Debe permitir continuar sin pedir limpiar plantilla.
