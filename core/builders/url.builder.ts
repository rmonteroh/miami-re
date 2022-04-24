import { OperatorsType } from "../enums";
import { ModifiersType } from "../enums/modifiers.enum";
import { AndOrOperatorType } from '../enums/operators.enum';

export class FilterUrlBuilder {
  private url: string;

  constructor() {
    this.url = "$filter=";
  }

  /**
   * 
   * @param property StandardStatus
   * @param value 'Active'
   * @returns tolower(StandardStatus) eq 'active'
   */
  public equalsTo(property: string, value: string) {
    if (!value) {
      return this;
    }

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(
        `${ModifiersType.Lowercase}(${property}) ${
          OperatorsType.Equal
        } '${value.toLowerCase()}'`
      );
    } else {
      this.url = this.url.concat(
        ` ${OperatorsType.And} ${ModifiersType.Lowercase}(${property}) ${OperatorsType.Equal} '${value.toLowerCase()}'`
      );
    }

    return this;
  }

  public equalsToNumber(property: string, value: number) {
    if (!value) {
      return this;
    }

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(`${property} ${OperatorsType.Equal} ${value}`);
    } else {
      this.url = this.url.concat(
        ` ${OperatorsType.And} ${property} ${OperatorsType.Equal} ${value}`
      );
    }

    return this;
  }

  public comparedWithModifier(
    property: string,
    modifier: ModifiersType,
    operator: OperatorsType,
    value: string | number
  ) {
    if (!value || value === "" || value === 0) {
      return this;
    }

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(
        `${modifier}(${property}) ${operator} ${value}`
      );
    } else {
      this.url = this.url.concat(
        ` ${OperatorsType.And} ${modifier}(${property}) ${operator} ${value}`
      );
    }

    return this;
  }

  public notEqualsTo(property: string, value: string | number) {
    if (value === "" || value === 0) {
      return this;
    }

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(
        `${property} ${OperatorsType.NotEqual} ${value}`
      );
    } else {
      this.url = this.url.concat(
        ` ${OperatorsType.And} ${property} ${OperatorsType.NotEqual} ${value}`
      );
    }

    return this;
  }

  public greaterThan(property: string, value: number) {
    if (!value) {
      return this;
    }

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(
        `${property} ${OperatorsType.GreaterThan} ${value}`
      );
    } else {
      this.url = this.url.concat(
        ` ${OperatorsType.And} ${property} ${OperatorsType.GreaterThan} ${value}`
      );
    }

    return this;
  }

  public greaterThanOrEquals(property: string, value: number) {
    if (!value) {
      return this;
    }

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(
        `${property} ${OperatorsType.GreaterThanOrEqual} ${value}`
      );
    } else {
      this.url = this.url.concat(
        ` ${OperatorsType.And} ${property} ${OperatorsType.GreaterThanOrEqual} ${value}`
      );
    }

    return this;
  }

  public lessThan(property: string, value: number) {
    if (!value) {
      return this;
    }

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(
        `${property} ${OperatorsType.LessThan} ${value}`
      );
    } else {
      this.url = this.url.concat(
        ` ${OperatorsType.And} ${property} ${OperatorsType.LessThan} ${value}`
      );
    }

    return this;
  }

  public lessThanOrEquals(property: string, value: number) {
    if (!value) {
      return this;
    }

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(
        `${property} ${OperatorsType.LessThanOrEqual} ${value}`
      );
    } else {
      this.url = this.url.concat(
        ` ${OperatorsType.And} ${property} ${OperatorsType.LessThanOrEqual} ${value}`
      );
    }

    return this;
  }

  public orContains(property: string, values: string | string[]) {
    if (values.length === 0) {
      return this;
    }

    const containValues: string[] = Array.isArray(values) ? values : [values];
    let containQuery: string = "";
    containValues.map((value, index) => {
      index === 0
        ? (containQuery = containQuery.concat(
            `contains(tolower(${property}),'${value.toLowerCase()}')`
          ))
        : (containQuery = containQuery.concat(
            ` or contains(tolower(${property}),'${value.toLowerCase()}')`
          ));
    });

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(containQuery);
    } else {
      this.url = this.url.concat(` and ${containQuery}`);
    }

    return this;
  }

  public andContains(property: string, values: string | string[]) {
    if (values.length === 0) {
      return this;
    }

    const containValues: string[] = Array.isArray(values) ? values : [values];
    let containQuery: string = "";
    containValues.map((value, index) => {
      index === 0
        ? (containQuery = containQuery.concat(
            `contains(tolower(${property}),'${value.toLowerCase()}')`
          ))
        : (containQuery = containQuery.concat(
            ` and contains(tolower(${property}),'${value.toLowerCase()}')`
          ));
    });

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(containQuery);
    } else {
      this.url = this.url.concat(` and ${containQuery}`);
    }

    return this;
  }

  public endsWith(property: string, value: string) {
    if (value === "") {
      return this;
    }

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(`endswith(tolower(${property}),'${value}')`);
    } else {
      this.url = this.url.concat(
        ` and endswith(tolower(${property}),'${value}')`
      );
    }

    return this;
  }

  public startWith(property: string, value: string) {
    if (value === "") {
      return this;
    }

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(`startswith(tolower(${property}),'${value}')`);
    } else {
      this.url = this.url.concat(
        ` and startswith(tolower(${property}),'${value}')`
      );
    }

    return this;
  }

  public setResultsSize(size: number) {
    if (size < 0) {
      return this;
    }

    if (!this.isFilterEmpty()) {
      this.url = this.url.concat(`&$top=${size}`);
    }

    return this;
  }

  public setSkipResults(skipValue: number) {
    if (skipValue < 0) {
      return this;
    }

    if (!this.isFilterEmpty()) {
      this.url = this.url.concat(`&$skip=${skipValue}`);
    }

    return this;
  }

  /**
   * @param properties ['PublicRemarks', 'PrivateRemarks']
   * @param values ['tlc']
   * @param operator and/or
   * @returns ex: (contains(tolower(PublicRemarks),'tlc') and contains(tolower(PrivateRemarks),'tlc'))
   */

  public propertiesContains(properties: string[], values: string | string[], operator: AndOrOperatorType) {
    if (values.length === 0) {
      return this;
    }

    const containValues: string[] = Array.isArray(values) ? values : [values];
    let containQuery: string = "";

    properties.forEach((property: string, index: number) => {
      if (index === 0) {
        containQuery = containQuery.concat(this.createOrAndQuery(property, containValues, operator));
      } else {
        containQuery = containQuery.concat(` ${operator} ${this.createOrAndQuery(property, values, operator)}`);
      }
    });

    if (this.isFilterEmpty()) {
      this.url = this.url.concat(containQuery);
    } else {
      this.url = this.url.concat(` and (${containQuery})`);
    }

    return this;
  }

  public build() {
    if (this.isFilterEmpty()) {
      return "";
    }

    return this.url;
  }

  private createOrAndQuery(property: string, values: string | string[], operator: AndOrOperatorType) {
    const containValues: string[] = Array.isArray(values) ? values : [values];
    let containQuery: string = "";
    containValues.map((value, index) => {
      index === 0
        ? (containQuery = containQuery.concat(
            `contains(tolower(${property}),'${value.toLowerCase()}')`
          ))
        : (containQuery = containQuery.concat(
            ` ${operator} contains(tolower(${property}),'${value.toLowerCase()}')`
          ));
    });

    return containQuery;
  }

  private isFilterEmpty(): boolean {
    return this.url === "$filter=";
  }
}
