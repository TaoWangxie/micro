import microApp from '@micro-zoe/micro-app';
import { EventCenterForMicroApp } from '@micro-zoe/micro-app';
import { childConfigs } from '@/utils/microConfigs';
import { useMicroStore } from '@/store/micro';

const $window: any = window;
export const registerChildMicro = () => {
    const microAppModules: any = {};
    childConfigs.map((item: any) => {
        const name = item.childName.replace(new RegExp('\\-', 'g'), '_');
        $window[`eventCenterFor_${name}`] = new EventCenterForMicroApp(
            item.childName,
        );
        microAppModules[item.childName] = [
            {
                loader(code: any) {
                    if (process.env.NODE_ENV === 'development') {
                        // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
                        // eslint-disable-next-line no-param-reassign
                        const reg = new RegExp(
                            `(from|import)(\\s*['"])(\\/` +
                                item.childName +
                                `\\/)`,
                            'g',
                        );
                        code = code.replace(reg, (all: any) => {
                            return all.replace(
                                `/${item.childName}/`,
                                item.childUrl,
                            );
                        });
                    }
                    return code;
                },
            },
        ];
    });
    microApp.start({
        plugins: {
            modules: microAppModules,
        },
    });

    // microApp.start({
    //     plugins: {
    //         modules: {
    //             // appName即应用的name值
    //             'child-micro': [
    //                 {
    //                     loader(code) {
    //                         if (process.env.NODE_ENV === 'development') {
    //                             // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
    //                             // eslint-disable-next-line no-param-reassign
    //                             let aa = 'child-micro'
    //                             let reg = new RegExp(`(from|import)(\\s*['"])(\\/` + aa + `\\/)`, 'g')
    //                             code = code.replace(reg, all => {
    //                                 return all.replace('/child-micro/', 'http://localhost:4001/child-micro/')
    //                             })
    //                         }
    //                         return code
    //                     }
    //                 }
    //             ],
    //             'child-micro2': [
    //                 {
    //                     loader(code) {
    //                         if (process.env.NODE_ENV === 'development') {
    //                             // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
    //                             // eslint-disable-next-line no-param-reassign
    //                             code = code.replace(/(from|import)(\s*['"])(\/child-micro2\/)/g, all => {
    //                                 return all.replace('/child-micro2/', 'http://localhost:4002/child-micro2/')
    //                             })
    //                         }
    //                         return code
    //                     }
    //                 }
    //             ],
    //             'child-micro3': [
    //                 {
    //                     loader(code) {
    //                         if (process.env.NODE_ENV === 'development') {
    //                             // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
    //                             // eslint-disable-next-line no-param-reassign
    //                             code = code.replace(/(from|import)(\s*['"])(\/child-micro3\/)/g, all => {
    //                                 return all.replace('/child-micro3/', 'http://localhost:4003/child-micro3/')
    //                             })
    //                         }
    //                         return code
    //                     }
    //                 }
    //             ],
    //         }
    //     }
    // })
};

export const globalDataListener = () => {
    const microStoreData: any = useMicroStore();
    //监听全局数据变化
    microApp.addGlobalDataListener((globalData: any) => {
        const { from, data } = globalData;
        if (from === 'child') {
            microStoreData.getMicroChildData(data);
        }
    }, true);
};
