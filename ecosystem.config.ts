import { Config } from 'pm2'

const config: Config = {
  apps: [
    {
      name: 'study-planner',
      script: 'npx',
      args: 'craco start',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8001,
      },
    },
  ],
}

export default config
