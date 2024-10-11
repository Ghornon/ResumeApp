import { Plugin, ResolvedConfig } from 'vite';

function viteTemplatesHMR(): Plugin {
    let config: ResolvedConfig;

    return {
        name: 'templatesHMR',
        async configResolved(_config) {
            config = _config;
        },
        async handleHotUpdate(context) {
            const isTemplateFile = /.*\/templates\/[^/]+\.tsx$/.test(context.file);

            // console.log(context.file, isTemplateFile);
            if (isTemplateFile) {
                context.server.ws.send({
                    type: 'custom',
                    event: 'template-update',
                    data: await context.modules,
                });

                // Return an empty array to prevent default HMR
                return [];
            }
        },
    };
}

export default viteTemplatesHMR;
