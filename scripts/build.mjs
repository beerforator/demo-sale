import { spawnSync } from 'node:child_process'
import { cp, mkdir, rm } from 'node:fs/promises'

import { variants } from './variants.mjs'
await rm('dist', { recursive: true, force: true })
await mkdir('dist', { recursive: true })
for (const { workspace, path } of variants) {
  const result = spawnSync('npm', ['run', 'build', `--workspace=@demo-sale/${workspace}`], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
  await cp(`apps/${workspace}/dist`, `dist/${path}`, { recursive: true })
}
await cp('static/index.html', 'dist/index.html')
