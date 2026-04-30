$base = 'c:\clawguru-seo-monster-gemini\app\[lang]'
$results = @()
$dirs = Get-ChildItem -LiteralPath $base -Directory

foreach ($section in $dirs) {
    # Check direct page.tsx
    $f = Join-Path $section.FullName 'page.tsx'
    if (Test-Path $f) {
        $c = Get-Content $f -Raw
        if ($c -notmatch 'min-h-screen bg-\[#0a0a0a\]') {
            $results += "[/$($section.Name)] $f"
        }
    }
    # Check sub-pages
    $subDirs = Get-ChildItem -LiteralPath $section.FullName -Directory -ErrorAction SilentlyContinue
    foreach ($sub in $subDirs) {
        $sf = Join-Path $sub.FullName 'page.tsx'
        if (Test-Path $sf) {
            $c = Get-Content $sf -Raw
            if ($c -notmatch 'min-h-screen bg-\[#0a0a0a\]') {
                $results += "[/$($section.Name)/$($sub.Name)]"
            }
        }
    }
}

Write-Host "=== NON-UPGRADED PAGES ($($results.Count) total) ==="
$results | Sort-Object | ForEach-Object { Write-Host $_ }
