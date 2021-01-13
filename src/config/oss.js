import OSS from 'ali-oss';


//云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
const region = 'oss-cn-shenzhen';
const accessKeyId = 'LTAIiMz2IUTvQF0p';
const accessKeySecret = 'kwNVtztBvLQeO9W4NqjY6M3TGN6Rcy';
const bucket = 'lgc-life-bucket';


export const oss = new OSS({
    region,
    accessKeyId,
    accessKeySecret,
    bucket
});
