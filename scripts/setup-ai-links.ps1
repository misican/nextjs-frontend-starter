# scripts/setup-ai-links.ps1
# Creates IDE-specific directory junctions pointing to .ai/skills/ on Windows.
# Safe to run multiple times (idempotent). No elevated privileges required for junctions.

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$source   = Join-Path $repoRoot '.ai\skills'

$links = @{
    '.github\skills' = $source
    '.cursor\skills'  = $source
}

foreach ($linkRel in $links.Keys) {
    $target = $links[$linkRel]
    $link   = Join-Path $repoRoot $linkRel
    $parent = Split-Path -Parent $link

    if (-not (Test-Path $parent)) {
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }

    if (Test-Path $link) {
        $item = Get-Item -Force $link
        if ($item.LinkType -eq 'Junction') {
            if ($item.Target -eq $target) {
                Write-Host "✓ $linkRel → already correct" -ForegroundColor Green
                continue
            } else {
                Write-Host "! $linkRel → stale junction, updating..." -ForegroundColor Yellow
                [System.IO.Directory]::Delete($link, $false)
            }
        } else {
            Write-Host "✗ $linkRel exists and is not a junction — skipping (remove manually)" -ForegroundColor Red
            continue
        }
    }

    cmd /c mklink /J "$link" "$target" | Out-Null
    Write-Host "✓ $linkRel → $target" -ForegroundColor Green
}
