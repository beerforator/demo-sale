import { spawnSync } from 'node:child_process'
import { cp, mkdir, rm } from 'node:fs/promises'

const variants = ['sushione', 'sushiwto', 'sushitree']
await rm('dist', { recursive: true, force: true })
await mkdir('dist', { recursive: true })
for (const variant of variants) {
  const result = spawnSync('npm', ['run', 'build', `--workspace=@demo-sale/${variant}`], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
  await cp(`apps/${variant}/dist`, `dist/${variant}`, { recursive: true })
}
await cp('static/index.html', 'dist/index.html')
