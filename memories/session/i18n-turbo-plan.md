# i18n 100-Sprachen Turbo-Plan (27.04.2026)

## Ziel
- Alle 100 Zielsprachen in maximaler Geschwindigkeit mit Ollama/aya-expanse übersetzen
- Parallelisierung und Hardware optimal ausnutzen
- Fortschritt und Ergebnisse lückenlos dokumentieren

## Strategie
1. **Locales in 8 Gruppen splitten** (je 8–10 Sprachen pro Gruppe)
2. **Für jede Gruppe einen eigenen node-Prozess starten**
   - Jeder Prozess: node scripts/i18n-build-autotranslate-via-aya.js <locales>
3. **(Optional) Mehrere Ollama-Instanzen auf verschiedenen Ports starten**
   - Wenn Hardware es zulässt (z.B. 2× GPU, 2× CPU-Server)
4. **Batch-Size im Skript erhöhen** (z.B. 100 statt 40)
5. **Checkpoints regelmäßig prüfen** (lib/i18n-autotranslate/*.json)
6. **Fehler/Abbrüche sofort neu starten (mit --resume)**
7. **Nach Abschluss: Konsolidierung und Validierung**

## Locale-Gruppen (Beispiel, anpassen je nach Auslastung)

### Gruppe 1
sk hr sr lt lv et sl ta te

### Gruppe 2
mr ur fa sw am tl gu kn ml

### Gruppe 3
pa zu xh is ga cy mt ka hy

### Gruppe 4
az kk uz tk ky tg mn ne si

### Gruppe 5
km lo my bo ug ku ps sd sq

### Gruppe 6
mk bs cnr gl eu ca co mi sm

### Gruppe 7
fj ht la eo yi ha yo ig sn

### Gruppe 8
st tn ny ceb jv

## Startbefehle (jeweils in neuem Terminal)

$env:OLLAMA_URL='http://127.0.0.1:11434'; $env:OLLAMA_MODEL='aya-expanse:8b'; node scripts/i18n-build-autotranslate-via-aya.js sk hr sr lt lv et sl ta te

$env:OLLAMA_URL='http://127.0.0.1:11434'; $env:OLLAMA_MODEL='aya-expanse:8b'; node scripts/i18n-build-autotranslate-via-aya.js mr ur fa sw am tl gu kn ml

$env:OLLAMA_URL='http://127.0.0.1:11434'; $env:OLLAMA_MODEL='aya-expanse:8b'; node scripts/i18n-build-autotranslate-via-aya.js pa zu xh is ga cy mt ka hy

$env:OLLAMA_URL='http://127.0.0.1:11434'; $env:OLLAMA_MODEL='aya-expanse:8b'; node scripts/i18n-build-autotranslate-via-aya.js az kk uz tk ky tg mn ne si

$env:OLLAMA_URL='http://127.0.0.1:11434'; $env:OLLAMA_MODEL='aya-expanse:8b'; node scripts/i18n-build-autotranslate-via-aya.js km lo my bo ug ku ps sd sq

$env:OLLAMA_URL='http://127.0.0.1:11434'; $env:OLLAMA_MODEL='aya-expanse:8b'; node scripts/i18n-build-autotranslate-via-aya.js mk bs cnr gl eu ca co mi sm

$env:OLLAMA_URL='http://127.0.0.1:11434'; $env:OLLAMA_MODEL='aya-expanse:8b'; node scripts/i18n-build-autotranslate-via-aya.js fj ht la eo yi ha yo ig sn

$env:OLLAMA_URL='http://127.0.0.1:11434'; $env:OLLAMA_MODEL='aya-expanse:8b'; node scripts/i18n-build-autotranslate-via-aya.js st tn ny ceb jv

## Hinweise
- Bei RAM/VRAM-Fehlern: Gruppen verkleinern oder Batch-Size reduzieren
- Bei Ollama-Fehlern: Instanz neu starten, ggf. Port wechseln
- Nach jedem Lauf: .json-Checkpoints prüfen und fehlende Sprachen nachziehen
- Fortschritt in /memories/session/plan.md und AGENTS.md dokumentieren

---
Letztes Update: 27.04.2026
