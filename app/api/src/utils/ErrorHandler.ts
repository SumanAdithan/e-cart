export default class ErrorHandler extends Error {
    name: string;
    statusCode: number;
    details?: Record<string, any>;
    constructor(message: string, statusCode: number, details?: Record<string, any>, name?: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}
