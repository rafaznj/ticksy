import type { Provider } from "@nestjs/common";
import { Scope } from "@nestjs/common";
export declare const simpleInjection: <T>(token: symbol, cls: {
    new (...rest: any): T;
}, scope?: Scope) => Provider;
