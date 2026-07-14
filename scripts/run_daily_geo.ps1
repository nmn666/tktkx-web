# Daily GEO: 2 overseas social-media account articles -> commit -> push (Vercel)
$ErrorActionPreference = "Stop"
Set-Location "E:\workspace\tktkx-web"

$today = Get-Date -Format "yyyy-MM-dd"
Write-Host "=== Daily GEO $today ==="

python scripts/daily_geo_news.py --date $today --count 2
if ($LASTEXITCODE -ne 0) { throw "daily_geo_news.py failed" }

git add src/data/news.json public/sitemap.xml public/llms.txt scripts/.daily_geo_state.json scripts/daily_geo_news.py 2>$null
$status = git status --porcelain
if (-not $status) {
  Write-Host "No changes to commit (already published for today)."
  exit 0
}

git commit -m "feat: daily GEO x2 overseas social accounts ($today)"
git push origin main
Write-Host "=== Done: pushed daily GEO for $today ==="
