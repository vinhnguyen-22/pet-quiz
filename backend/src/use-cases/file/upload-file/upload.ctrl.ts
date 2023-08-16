import AWS from 'aws-sdk';
import * as Koa from 'koa';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
class UploadCtrl {
    async upload(ctx: Koa.Context, _next: Koa.Next) {
        try {
            if (!ctx.request.files || !ctx.request.files.file) {
                ctx.throw(400, 'No file uploaded');
            }
            const file: any = ctx.request.files.file;
            const fileContent = await fs.readFile(file.filepath);
            const uniqueFilename = uuidv4(); // Generate a unique filename
            const params: any = {
                Bucket: 'medufa-stag',
                Key: uniqueFilename,
                Body: fileContent,
                ACL: 'public-read',
            };
            const s3 = new AWS.S3();
            const res = await s3.upload(params).promise();
            ctx.body = res;
        } catch (error) {
            console.error(error);
            ctx.throw(500, 'File upload failed');
        }
    }
}

export default new UploadCtrl();
