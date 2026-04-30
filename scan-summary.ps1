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

Write-Host "TOTAL pages.tsx found: $($allPages.Count)"
Write-Host "UPGRADED (dark theme): $($upgraded.Count)"
Write-Host "NOT-UPGRADED: $($old.Count)"
Write-Host ""

# Group by section
$sections = @{}
foreach ($p in $old) {
    $section = ($p -split '\\')[0]
    if (-not $sections.ContainsKey($section)) { $sections[$section] = 0 }
    $sections[$section]++
}
Write-Host "=== NOT-UPGRADED BY SECTION ==="
$sections.GetEnumerator() | Sort-Object Value -Descending | ForEach-Object {
    Write-Host "  $($_.Key): $($_.Value) pages"
}

Write-Host ""
Write-Host "=== MOLTBOT NOT-UPGRADED ==="
$old | Where-Object { $_ -match '^moltbot\\' } | Sort-Object | ForEach-Object { Write-Host "  $_" }
