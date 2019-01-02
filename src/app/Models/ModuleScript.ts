export class ModuleScript<T>{
    parameterName: string;
    label: string;
    required: boolean;
   // order: number;
    controlType: string;
    //options: {key: string, value: string}[] = [];

    constructor(options: {
        controlName?: string,
        label?: string,
        required?: boolean,
      //  order?: number,
        controlType?: string,
      //  options ?:{key: string, value: string}[]
      } = {}) {
      this.parameterName = options.controlName || '';
      this.label = options.label || '';
      this.required = !!options.required;
   //   this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
     // this.options = options.options || [];
    }
}
