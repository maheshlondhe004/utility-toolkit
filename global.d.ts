export {};

declare global {
    interface Window {
        adsbygoogle: { push: (args: any) => void }[];
    }
}