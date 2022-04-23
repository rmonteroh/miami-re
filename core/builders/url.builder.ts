import { OperatorsType } from "../enums";

class UrlBuilder {
  private url: string;
  
  constructor() {
    this.url = '$filter=';
  }

  public equalsTo(property: string, value: string | number) {
    if (this.isFilterEmpty()) {
      this.url.concat(`${property} ${OperatorsType.Equal} ${value}`);
    } else {
      this.url.concat(` ${OperatorsType.And} ${property} ${OperatorsType.Equal} ${value}`);
    }

    return this;
  }

  public notEqualsTo(property: string, value: string | number) {
    if (this.isFilterEmpty()) {
      this.url.concat(`${property} ${OperatorsType.NotEqual} ${value}`);
    } else {
      this.url.concat(` ${OperatorsType.And} ${property} ${OperatorsType.NotEqual} ${value}`);
    }

    return this;
  }

  public greaterThan(property: string, value: string | number) {
    if (this.isFilterEmpty()) {
      this.url.concat(`${property} ${OperatorsType.GreaterThan} ${value}`);
    } else {
      this.url.concat(` ${OperatorsType.And} ${property} ${OperatorsType.GreaterThan} ${value}`);
    }

    return this;
  }

  public greaterThanOrEquals(property: string, value: string | number) {
    if (this.isFilterEmpty()) {
      this.url.concat(`${property} ${OperatorsType.GreaterThanOrEqual} ${value}`);
    } else {
      this.url.concat(` ${OperatorsType.And} ${property} ${OperatorsType.GreaterThanOrEqual} ${value}`);
    }

    return this;
  }

  public lessThan(property: string, value: string) {
    if (this.isFilterEmpty()) {
      this.url.concat(`${property} ${OperatorsType.LessThan} ${value}`);
    } else {
      this.url.concat(` ${OperatorsType.And} ${property} ${OperatorsType.LessThan} ${value}`);
    }

    return this;
  }

  public lessThanOrEquals(property: string, value: string) {
    if (this.isFilterEmpty()) {
      this.url.concat(`${property} ${OperatorsType.LessThanOrEqual} ${value}`);
    } else {
      this.url.concat(` ${OperatorsType.And} ${property} ${OperatorsType.LessThanOrEqual} ${value}`);
    }

    return this;
  }

  public contains(property: string, values: string | string[]) {

    const containValues: string[] = Array.isArray(values) ? values : [values];
    const containQuery: string = '';
    containValues.map((value, index) => {
      (index === 0) ?
        containQuery.concat(`contains(tolower(${property}),'${value.toLowerCase()}'`) :
        containQuery.concat(` or contains(tolower(${property}),'${value.toLowerCase()}'`) ;
    });

    if (this.isFilterEmpty()) {
      this.url.concat(containQuery);
    } else {
      this.url.concat(` and ${containQuery}`);
    }

    return this;
  }

  public endsWith(property: string, value: string) {

    if (this.isFilterEmpty()) {
      this.url.concat(`endswith(tolower(${property}),'${value}')`);
    } else {
      this.url.concat(` and endswith(tolower(${property}),'${value}')`);
    }

    return this;
  }

  public startWith(property: string, value: string) {

    if (this.isFilterEmpty()) {
      this.url.concat(`startswith(tolower(${property}),'${value}')`);
    } else {
      this.url.concat(` and startswith(tolower(${property}),'${value}')`);
    }

    return this;
  }

  public setResultsSize(size: number) {
    if (!this.isFilterEmpty()) {
      this.url.concat(`&$top=${size}`)
    }

    return this;
  }

  public setSkipResults(skipValue: number) {
    if (!this.isFilterEmpty()) {
      this.url.concat(`&$skip=${skipValue}`)
    }

    return this;
  }

  public build() {
    return this.url;
  }

  private isFilterEmpty(): boolean {
    return this.url === '$filter=';
  }
}