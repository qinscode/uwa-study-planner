module.exports = {
  apps: [
    {
      name: 'study-planner',
      script: 'yarn',
      args: 'start',
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
