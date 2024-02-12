const { loggers, format, transports } = require('winston')

class Logger {
    constructor(loggerName, fields) {
        if(!loggerName) {
            throw new Error('logger module requires a name')
        } else {
            loggers.add(
                loggerName,
                {
                    level: process.env.LOG_LEVEL || 'info',
                    format: format.combine(
                        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                        format.json()
                    ),
                    transports:[
                        new transports.Console(),
                    ]
                }
            )

            this.winstonLogger = loggers.get(loggerName)

            if(fields) {
                let keys = Object.keys(fields)
                for(let i = 0; i< keys.length; i++) {
                    loggerName.defaultMeta[keys[i]] = fields[keys[i]]
                }
            }
        }
    }

    addMetaData(mData) {
        let keys = Object.keys(mData)
        for(let i = 0; i < keys.length; i++) {
            this.winstonLogger.defaultMeta[keys[i]] = fields[keys[i]]
        }
    }

    appendFile(fieldName, fieldValue, fieldData) {
        let fData;
        if(fieldData) {
            fData = JSON.parse(JSON.stringify(fieldData))
            fData[fieldName] = fieldValue
        } else {
            fData = JSON.parse(`{ "${fieldName}": "${fieldValue}" }`)
        }

        return fData
    }

    log(loglevel, message, fData) {
        if(!fData) {
            throw new Error('Missing Mandatory Meta Data')
        } else {
            this.winstonLogger.log(loglevel, message, fData)
        }
    }

    removeMetaData(mData) {
        let keys = Object.keys(mData)
        for(let i = 0; i < keys.length; i++) {
           delete this.winstonLogger.defaultMeta[keys[i]]
        }
    }

    resetMetaData() {
        this.winstonLogger.defaultMeta = {}
    }
}

module.exports = new Logger(process.env.LOGGER_NAME || "defaultLogger")