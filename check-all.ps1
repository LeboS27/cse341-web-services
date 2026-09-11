$ErrorActionPreference = 'Stop'

Write-Host 'Checking Week 01 Individual Activity...'
Push-Location '.\w01-individual-activity'
npm run check
Pop-Location

Write-Host 'Checking Contacts API...'
Push-Location '.\contacts-api'
$env:USE_MEMORY_STORE = 'true'
npm run check
npm test
Pop-Location

Write-Host 'Checking Project 2 CRUD API...'
Push-Location '.\project2-crud-api'
$env:USE_MEMORY_STORE = 'true'
npm run check
npm test
Pop-Location

Write-Host 'All local checks completed.'
