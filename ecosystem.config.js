module.exports = {
  apps: [{
    name: 'API',
    script: 'index.js',
    autorestart: true,
    watch: true,
    max_memory_restart: '500M',
    ignore_watch: [
      "node_modules",
      "uploads",
      "logs",
      ".git",
      "static",
      "test"
    ],
    error_file: "./logs/app-err.log",
    out_file: "./logs/app-out.log"
  }]
};
