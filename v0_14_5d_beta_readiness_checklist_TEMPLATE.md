# v0.14.5d - Beta readiness checklist

## 1. Estado tecnico minimo

- [ ] package.json existe
- [ ] src/App.tsx existe
- [ ] src/data/athletic/seasons.ts existe
- [ ] src/simulation/leagueSimulator.ts existe
- [ ] src/components/SupportButton.tsx existe
- [ ] src/components/SupportButton.css existe
- [ ] npm.cmd run build ejecutado y OK
- [ ] npm.cmd run dev abre http://localhost:5173/
- [ ] No hay errores rojos en consola del navegador
- [ ] No hay imports sin usar
- [ ] No hay warnings criticos de TypeScript

Nota: el warning de chunk mayor de 500 kB de Vite no bloquea beta.

---

## 2. Encoding / nombres

Comprobar en partida nueva:

- [ ] Inigo Martinez / Inigo con ene correcta en pantalla
- [ ] Inaki Williams / Inaki con ene correcta en pantalla
- [ ] Benat / Benat con ene correcta en pantalla
- [ ] Benat Prados / Benat con ene correcta en pantalla
- [ ] Joaquin Caparros correcto en pantalla
- [ ] Jose Angel Ziganda correcto en pantalla
- [ ] Athletic Club Historico correcto en pantalla

No pasar beta si aparece texto roto tipo Inigo con caracteres raros, Historico roto o simbolos extranos.

---

## 3. Home / monetizacion

- [ ] Pantalla inicial carga correctamente
- [ ] Boton principal de empezar visible
- [ ] Boton Ko-fi abre el enlace correcto
- [ ] Boton PayPal.me abre el enlace correcto
- [ ] Bloque de apoyo no tapa botones principales
- [ ] Bloque de apoyo se ve bien en ventana estrecha

---

## 4. Draft

- [ ] Se puede elegir dificultad
- [ ] Se puede elegir formacion
- [ ] La ruleta o seleccion de temporada funciona
- [ ] No se repiten temporadas dentro del mismo draft
- [ ] Los jugadores se pueden colocar
- [ ] No aparecen nombres duplicados absurdos
- [ ] No hay bloqueo por falta de posiciones
- [ ] El boton de confirmar o avanzar aparece cuando debe
- [ ] Se puede elegir entrenador
- [ ] Se llega al resumen de equipo

---

## 5. Simulacion Liga/Copa

Jugar o simular al menos 5 temporadas.

| Sim | Puesto Athletic | Campeon Copa | Subcampeon Copa | Descensos | Villarreal puesto | Girona puesto | Observaciones |
|---:|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |  |
| 4 |  |  |  |  |  |  |  |
| 5 |  |  |  |  |  |  |  |

### Reglas de decision

- Si Oviedo / Alaves / Osasuna bajan mucho: normal.
- Si Villarreal desciende 2 o mas veces en 10: ajustar.
- Si Villarreal queda 17-20 en 4 o mas de 10: ajustar.
- Si Girona baja 2-3 veces en 10: tolerable.
- Si Madrid/Barca copan siempre la Copa: retocar.
- Si una cenicienta gana Copa muy de vez en cuando: aceptable.
- Si una cenicienta llega a final constantemente: ajustar.

---

## 6. Resumen final

- [ ] Se ve puesto final de Liga
- [ ] Se ve campeon/subcampeon de Copa
- [ ] Se ve tabla final de Liga
- [ ] Se ven zonas europeas/descenso correctamente
- [ ] Se ve el equipo elegido
- [ ] Se puede volver a empezar
- [ ] Ko-fi/PayPal siguen visibles pero no invasivos

---

## 7. Criterio de pase a beta local

Se puede pasar a v0.15.0 - Beta local cerrada si:

- [ ] Build OK
- [ ] Nombres OK
- [ ] Draft OK
- [ ] Liga OK
- [ ] Copa OK
- [ ] Ko-fi/PayPal OK
- [ ] 5 partidas completas sin bloqueo
- [ ] No hay bug visual grave

---

## 8. Decision final

- [ ] Apto para beta local cerrada
- [ ] No apto todavia

Notas:

