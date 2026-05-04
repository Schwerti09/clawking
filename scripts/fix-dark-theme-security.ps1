# Fix Dark Theme Compliance - SECURITY_SLUGS
# Problem: bg-red-900 mit text-red-900 (unlesbar)
# Lösung: bg-red-900 → bg-red-900 border border-red-700, text-red-900 → text-red-300

$basePath = Split-Path $PSScriptRoot -Parent
$targetPath = Join-Path $basePath "app"
$files = Get-ChildItem -Path $targetPath -Recurse -Filter "*.tsx" -File | Where-Object { $_.FullName -like "*\[lang\]*" }
$fixedCount = 0
$issues = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Fix bg-red-900 → bg-red-900 border border-red-700
    $content = $content -replace 'bg-red-900', 'bg-red-900 border border-red-700'
    
    # Fix text-red-900 → text-red-300
    $content = $content -replace 'text-red-900', 'text-red-300'
    
    # Fix bg-amber-900 mit text-amber-900 (falls vorhanden)
    $content = $content -replace 'text-amber-900', 'text-amber-300'
    
    if ($content -ne $originalContent) {
        Set-Content $file.FullName $content -NoNewline
        $fixedCount++
        Write-Host "Fixed: $($file.FullName)" -ForegroundColor Green
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Files fixed: $fixedCount" -ForegroundColor Green
Write-Host "Total files scanned: $($files.Count)" -ForegroundColor Cyan

if ($fixedCount -gt 0) {
    Write-Host "`n✅ Dark Theme fixes applied successfully" -ForegroundColor Green
} else {
    Write-Host "`n⚠️ No files needed fixing" -ForegroundColor Yellow
}
