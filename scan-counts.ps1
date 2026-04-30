$base = 'c:\clawguru-seo-monster-gemini\app\[lang]'
$allPages = Get-ChildItem -LiteralPath $base -Recurse -Filter 'page.tsx'
$old = @(); $upgraded = @()
foreach ($f in $allPages) {
    $c = Get-Content $f.FullName -Raw
    $rel = $f.FullName -replace [regex]::Escape('c:\clawguru-seo-monster-gemini\app\[lang]\'), '' -replace '\\page\.tsx$', ''
    if ($c -notmatch 'min-h-screen bg-\[#0a0a0a\]') { $old += $rel } else { $upgraded += $rel }
}
Write-Host "TOTAL: $($allPages.Count)"
Write-Host "UPGRADED: $($upgraded.Count)"
Write-Host "NOT-UPGRADED: $($old.Count)"
Write-Host ""

# Moltbot only
$moltOld = $old | Where-Object { $_ -match '^moltbot\\' }
$moltUp  = $upgraded | Where-Object { $_ -match '^moltbot\\' }
Write-Host "MOLTBOT UPGRADED: $($moltUp.Count)"
Write-Host "MOLTBOT NOT-UPGRADED: $($moltOld.Count)"
Write-Host ""

# Other sections
$sections = @{}
foreach ($p in $old | Where-Object { $_ -notmatch '^moltbot\\' }) {
    $s = ($p -split '\\')[0]; if(-not $sections[$s]){$sections[$s]=0}; $sections[$s]++
}
Write-Host "=== OTHER SECTIONS NOT-UPGRADED ==="
$sections.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 20 | ForEach-Object { Write-Host "  $($_.Key): $($_.Value)" }
