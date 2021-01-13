module.exports = function (api) {
    api.cache(true);
  
    const presets = [
        "@babel/preset-env",
        "@babel/preset-react",
        "react-app",
    ];
    const plugins = [
        ["import", { "libraryName": "antd-mobile", "style": "css" }],
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ]
    ];
  
    return {
        presets,
        plugins
    };
}