$base = 'c:\clawguru-seo-monster-gemini\app\[lang]\moltbot'
$dirs = Get-ChildItem -LiteralPath $base -Directory
$old = @()
foreach ($d in $dirs) {
    $f = Join-Path $d.FullName 'page.tsx'
    if (Test-Path $f) {
        $c = Get-Content $f -Raw
        if ($c -notmatch 'min-h-screen bg-\[#0a0a0a\]') {
            $old += $d.Name
        }
    }
}
Write-Host "=== NON-UPGRADED ($($old.Count) pages) ==="
$old | Sort-Object | ForEach-Object { Write-Host $_ }
