export function apiResponse(statusCode: number, message: string,  data: any) {
    return {
        statusCode: statusCode,
        body: JSON.stringify({
            message,
            data,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    };
} 