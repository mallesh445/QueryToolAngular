export class Module{
    public selectedModule:number;
    public selectedOperation:number;
    public builtQuery:string;
    public queryTitle:string;
    public scriptId:number;

    constructor(selectedModule:number,selectedOperation:number,builtQuery:string,queryTitle:string,scriptId:number){
        
        this.selectedModule=selectedModule;
        this.selectedOperation=selectedOperation;
        this.builtQuery=builtQuery;
        this.queryTitle=queryTitle;
        this.scriptId=scriptId;
    }
}