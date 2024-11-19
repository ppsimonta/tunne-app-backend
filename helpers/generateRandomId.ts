export default function getRandomInt(max: any): string {
    const randomInt = Math.floor(Math.random() * max);
    return randomInt.toString();
}