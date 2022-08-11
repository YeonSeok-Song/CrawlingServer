const winston = require('winston') ;
const winstonDaily = require('winston-daily-rotate-file');

const {combine, timestamp, label, printf, colorize} = winston.format;
const logDir = 'logs';

const logTemplate = printf(info => {
    return `${info.timestamp} ${info.level} : ${info.label} - ${info.message}`;
})

const level = {
    error   : 0,
    warn    : 1,
    info    : 2,
    http    : 3,
    verbose : 4,
    debug   : 5,
    silly   : 6
}

const logContainer = new winston.Container();

logContainer.add('userLogger', {
    // combine할때 형식이나 값을 지정해줄 수 있다.
    format: combine(
        label({ label: "user"}),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logTemplate,
    ),
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`, // file 이름 날짜로 저장
            maxFiles: 30,  // 30일치 로그 파일 저장
            zippedArchive: true, 
        }),
      	// warn 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'warn',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/warn',
            filename: `%DATE%.warn.log`, // file 이름 날짜로 저장
            maxFiles: 30,  // 30일치 로그 파일 저장
            zippedArchive: true, 
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장 
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),
    ]
})


if (process.env.NODE_ENV !== 'production') {
    logContainer.add(new winston.transports.Console({
        format: combine(
            colorize({ all: true }), // console 에 출력할 로그 컬러 설정 적용함
            logTemplate // log format 적용
        )
    }));
}

//해당 stream은 morgan과도 연동 할 수 있다. 
const stream = {
    write: message => {
        const log = logContainer.get(message.split("/")[1]);
        log.info(message);
    }
}

export { logContainer, stream };