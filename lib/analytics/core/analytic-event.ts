import type { AnalyticEventProperties } from "./core.types";

export class AnalyticEvent<TProperties extends Record<string, unknown> = Record<string, unknown>,> {
  readonly id: string;

  constructor(
    readonly name: string,
    readonly properties: AnalyticEventProperties<TProperties>,
    id = name,
  ) {
    this.id = id;
  }

  withProperties(properties: Partial<AnalyticEventProperties<TProperties>>) {
    const merged = { ...this.properties, ...properties };
    const filtered = Object.fromEntries(
      Object.entries(merged).filter(([, value]) => value !== null && value !== undefined && value !== ""),
    ) as AnalyticEventProperties<TProperties>;

    return new AnalyticEvent<TProperties>(this.name, filtered, this.id);
  }

  extractProperties<TKey extends keyof TProperties>(keys: TKey[]) {
    const properties = Object.fromEntries(
      keys
        .filter((key) => {
          const value = this.properties[key];
          return value !== null && value !== undefined && value !== "";
        })
        .map((key) => [key, this.properties[key]]),
    ) as Pick<TProperties, TKey>;

    return new AnalyticEvent<Pick<TProperties, TKey>>(this.name, properties, this.id);
  }
}
