# scripts/setup-ai-links.ps1
# Creates IDE-specific directory junctions and file symlinks pointing to .ai/ on Windows.
# Directory junctions require no elevated privileges.
# File symlinks (e.g. copilot-instructions.md) require Developer Mode or elevated privileges.
# Safe to run multiple times (idempotent).

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$ai       = Join-Path $repoRoot '.ai'

# Ordered list of [linkRel, absoluteTarget, isFile]
$links = [ordered]@{
    '.github\copilot-instructions.md' = @{ target = (Join-Path $ai 'copilot-instructions.md'); isFile = $true  }
    '.github\agents'                  = @{ target = (Join-Path $ai 'agents');                  isFile = $false }
    '.github\prompts'                 = @{ target = (Join-Path $ai 'prompts');                 isFile = $false }
    '.github\hooks'                   = @{ target = (Join-Path $ai 'hooks');                   isFile = $false }
    '.github\instructions'            = @{ target = (Join-Path $ai 'instructions');            isFile = $false }
    '.github\skills'                  = @{ target = (Join-Path $ai 'skills');                  isFile = $false }
    '.cursor\skills'                  = @{ target = (Join-Path $ai 'skills');                  isFile = $false }
    '.cursor\agents'                  = @{ target = (Join-Path $ai 'agents');                  isFile = $false }
    '.cursor\prompts'                 = @{ target = (Join-Path $ai 'prompts');                 isFile = $false }
}

foreach ($linkRel in $links.Keys) {
    $info   = $links[$linkRel]
    $target = $info.target
    $isFile = $info.isFile
    $link   = Join-Path $repoRoot $linkRel
    $parent = Split-Path -Parent $link

    if (-not (Test-Path $parent)) {
        New-Item -ItemType Directory -Path $parent -Force | Out-Null
    }

    if (Test-Path -LiteralPath $link) {
        $item = Get-Item -Force -LiteralPath $link
        $isReparsePoint = ($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint) -ne 0
        if ($isReparsePoint) {
            $currentTarget = $item.Target
            if ($currentTarget -eq $target) {
                Write-Host "✓ $linkRel → already correct" -ForegroundColor Green
                continue
            } else {
                Write-Host "! $linkRel → stale link ($currentTarget), updating..." -ForegroundColor Yellow
                if ($isFile) { Remove-Item -LiteralPath $link -Force }
                else         { [System.IO.Directory]::Delete($link, $false) }
            }
        } else {
            Write-Host "✗ $linkRel exists and is not a link — skipping (remove manually to replace)" -ForegroundColor Red
            continue
        }
    }

    if ($isFile) {
        try {
            New-Item -ItemType SymbolicLink -Path $link -Target $target -ErrorAction Stop | Out-Null
            Write-Host "✓ $linkRel → $target" -ForegroundColor Green
        } catch {
            Write-Host "✗ $linkRel → file symlink failed. Enable Developer Mode or run as Administrator." -ForegroundColor Red
        }
    } else {
        cmd /c mklink /J "$link" "$target" | Out-Null
        Write-Host "✓ $linkRel → $target" -ForegroundColor Green
    }
}
