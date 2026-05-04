# Pre-Push Check: Dark Theme Compliance
# Prüft auf verbotene CSS-Klassen gemäß AGENTS.md Rule 6
# Quality Improvement Master Plan - Phase 2.2

$basePath = Split-Path $PSScriptRoot -Parent
$targetPath = Join-Path $basePath "app"

# Verbotene Klassen gemäß AGENTS.md Rule 6
$forbidden = @(
    "bg-gray-50", "bg-gray-100", "bg-gray-200", "bg-white",
    "bg-teal-50", "bg-orange-50", "bg-amber-50", "bg-cyan-50", "bg-pink-50", "bg-indigo-50",
    "bg-teal-100", "bg-orange-100", "bg-amber-100", "bg-cyan-100",
    "text-gray-600", "text-gray-800", "text-gray-900",
    "text-teal-600", "text-teal-700", "text-teal-800", "text-teal-900",
    "text-blue-600", "text-blue-700", "text-blue-800", "text-blue-900",
    "border-teal-200", "border-orange-200"
)

$files = Get-ChildItem -Path $targetPath -Recurse -Filter "*.tsx" -File
$issues = @()

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName | Out-String
        foreach ($class in $forbidden) {
            if ($content -match [regex]::Escape($class)) {
                $issues += "$($file.FullName): $class gefunden"
            }
        }
    } catch {
        # Datei kann nicht gelesen werden (z.B. Platzhalter-Pfade) - überspringen
    }
}

if ($issues.Count -gt 0) {
    Write-Host "❌ Dark Theme Issues gefunden:" -ForegroundColor Red
    $issues | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }
    Write-Host "`nBitte beheben Sie diese Issues vor dem Commit." -ForegroundColor Red
    Write-Host "Siehe AGENTS.md Rule 6 für die Quick Fix Table." -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "✅ Keine Dark Theme Issues gefunden" -ForegroundColor Green
    exit 0
}
