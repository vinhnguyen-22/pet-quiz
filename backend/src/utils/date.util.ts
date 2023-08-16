export function format(dateStr: string) {
    const formattedDate = new Date(dateStr).toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    return formattedDate;
}
