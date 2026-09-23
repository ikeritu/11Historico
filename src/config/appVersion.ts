export const APP_VERSION = "v0.24.9a";
export const APP_VERSION_NAME = "Share & Retention Hotfix";
export const APP_STATUS = "Europa Career completa: clasificación europea, torneo jugable con fase inicial/semifinal/final, títulos europeos sumando al palmarés, recompensa de prestigio (bonus de rating + narrativa) por el rendimiento europeo, ranking local y global con desglose de títulos por competición, y pulido responsive/visual por competición (Champions/Europa League/Conference). Incluye compartir texto y logros de carrera, y avisa si falla el guardado del ranking local. Mantiene ruleta, ranking y balance de Liga/Copa/Supercopa intactos.";

// Derivados de APP_VERSION/APP_VERSION_NAME: fuente única para los scripts
// de QA que comprueban que README/CHANGELOG/docs apuntan al release actual
// (antes cada script tenía su propia copia hardcodeada de estos valores, lo
// que hacía fácil dejar alguno desactualizado al publicar una fase nueva;
// ver v0.24.7 — Europa Career Release Stabilization).
export const CURRENT_RELEASE_TAG = `${APP_VERSION}_SHARE_RETENTION_HOTFIX`;
export const CURRENT_RELEASE_DOC = "docs/v0_24_9a_SHARE_RETENTION_HOTFIX.md";
