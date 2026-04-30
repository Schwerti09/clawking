$base = 'c:\clawguru-seo-monster-gemini\app\[lang]'
$allPages = Get-ChildItem -LiteralPath $base -Recurse -Filter 'page.tsx'
$old = @()
$upgraded = @()

foreach ($f in $allPages) {
    $c = Get-Content $f.FullName -Raw
    $rel = $f.FullName -replace [regex]::Escape('c:\clawguru-seo-monster-gemini\app\[lang]\'), '' -replace '\\page\.tsx$', ''
    if ($c -notmatch 'min-h-screen bg-\[#0a0a0a\]') {
        $old += $rel
    } else {
        $upgraded += $rel
    }
}

Write-Host "=== UPGRADED ($($upgraded.Count) pages) ==="
Write-Host ""
Write-Host "=== NON-UPGRADED ($($old.Count) pages) ==="
$old | Sort-Object | ForEach-Object { Write-Host "  NOT-UPGRADED: $_" }
