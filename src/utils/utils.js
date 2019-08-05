export function extractError(e) {
    if (e.response === undefined || e.response.status === undefined) {
        return  'Can\'t set response. Please, try again later.';
    }

    if (e.response.data.message) {
        return e.response.data.message;
    }
}