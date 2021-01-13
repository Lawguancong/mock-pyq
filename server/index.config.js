// cat index.config.js
module.exports = {
    apps: [{
        name: 'm.ibarca.fun_server',
        script: './index.js',
        node_args: '-r esm',
        instances: 1,
        exec_mode: "fork",
        wait_ready: false,
        watch: false,
        listen_timeout: 8000,
        kill_timeout: 3000
    }]
}