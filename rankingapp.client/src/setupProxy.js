// Not sure this is needed but i seen projects with this configuration 
// before so might remove if not needed

import { createProxyMiddleware } from 'http-proxy-middleware';


const context = [
    "/weatherforecast",
    "/item"
];
//before it was '/api""
//export default function (app) {
//    app.use(
//        '/api',
//        createProxyMiddleware(context,{
//            target: 'http://localhost:5159', // Replace with your backend server URL
//            changeOrigin: true,
//            secure: false,
//            headers: {
//                Connection: 'Keep-Alive'
//            }
//        })
//    );
//}

export default function (app) {
    context.forEach(path => {
        app.use(
            path,
            createProxyMiddleware({
                target: 'http://localhost:5159', // Replace with your backend server URL
                changeOrigin: true,
                secure: false,
                headers: {
                    Connection: 'Keep-Alive'
                }
            })
        );
    });
}