let totalTimeInMS = 0;
let timeOut = 2 * 1000;
let timeoutId: NodeJS.Timeout | null = null; // Store the timeout ID

export default async function CheckLatency<T>(fn: () => Promise<T>, desc: string): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    
    // console.log(`${desc}: ${(end - start).toFixed(2)} ms`);

    totalTimeInMS += (end - start);
    timeOut += 2;

    // Clear previous timeout before setting a new one
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
        // console.log("=============================")
        // console.log(`Total time: ${totalTimeInMS.toFixed(2)} ms`);
        totalTimeInMS = 0
        // console.log("=============================")
    }, timeOut);

    return result;
}
