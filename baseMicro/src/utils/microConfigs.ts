export const childConfigs = [
    {
        childLabel: '应用1',
        childName: 'child-micro',
        childUrl: 'http://localhost:4001/child-micro/',
        keepAlive: false
    },
    {
        childLabel: '应用2',
        childName: 'child-micro2',
        childUrl: 'http://localhost:4002/child-micro2/',
    },
    {
        childLabel: 'pc可视化',
        childName: 'child-micro3',
        childUrl: 'http://localhost:4003/child-micro3/',
    }
]

export const menus: any = {
    'child-micro': [
        {
            name: 'demo',
            path: '/demo',
        },
        {
            name: '主页11',
            path: '',
            children: [
                {
                    name: 'home',
                    path: '/home',
                },
                {
                    name: 'aaa',
                    path: '/aaa',
                },
            ],
        },
        {
            name: 'test',
            path: '/test',
        },
    ],
    'child-micro2': [],
    'child-micro3': [],
}