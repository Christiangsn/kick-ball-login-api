import path from 'path'
import { register } from 'tsconfig-paths'

register({
  baseUrl: path.resolve(__dirname, '../..'),
  paths: {
    '@main/*': ['main/*'],
    '@app/*': ['app/*'],
    '@domain/*': ['domain/*'],
    '@shared/*': ['shared/*'],
    '@infra/*': ['infra/*'],
    '@application/*': ['application/*']
  }
})
