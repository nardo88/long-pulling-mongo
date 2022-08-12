// создаем файл конфигурации swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple express API'
        },
        // указываем настройки куда мы сможем делать запросы из swagger
        servers: [
            { url: 'http://localhost:5000' }
        ],
    },
    // здесь мы указываем где будет хранится описание endpoints (т.е. в папке routers)
    // путь указываем относительно файла index.js там где запускаем express
    apis: ['./routers/*.js']
}

export default options