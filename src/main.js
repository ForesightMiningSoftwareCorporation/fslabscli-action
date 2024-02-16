import core from '@actions/core'
import tool from '@actions/tool-cache'
import exec from '@actions/exec'
import path from 'node:path'

export async function fslabscliDownload() {
  const version = core.getInput('version')

  const fslabscliPackages = [
    {
      arch: 'x64',
      platform: 'linux',
      url: `https://github.com/ForesightMiningSoftwareCorporation/fslabscli/releases/download/fslabscli-${version}/fslabscli-x86_64-unknown-linux-gnu-1.75-v${version}`,
    },
  ]

  const fslabscliPackage = fslabscliPackages.find(
    x => x.platform === process.platform && x.arch === process.arch
  )
  if (!fslabscliPackage) {
    throw new Error(
      `Unsupported platform ${process.platform} and arch ${process.arch}`
    )
  }

  core.info(`Downloading ${fslabscliPackage.url}`)
  const downloadPath = await tool.downloadTool(
    fslabscliPackage.url,
    undefined,
    `token ${core.getInput('token')}`
  )

  core.debug('Adding to the cache ...')
  const cachedPath = await tool.cacheDir(
    downloadPath,
    'fslabscli',
    version,
    process.arch
  )

  if (process.platform == 'linux' || process.platform == 'darwin') {
    await exec.exec('chmod', ['+x', path.join(cachedPath, 'fslabcli')])
  }

  core.addPath(cachedPath)

  core.info(`Downloaded to ${cachedPath}`)
}

export async function fslabscliVersion() {
  core.info('Show fslabscli version')
  await exec.exec('fslabscli --version')
}

export async function run() {
  try {
    await fslabscliDownload()
    await fslabscliVersion()
    process.exitCode = core.ExitCode.Success
  } catch (error) {
    core.setFailed(error.message)
  }
}
