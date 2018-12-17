export class moduleentity{
    public selectedModule:number;
    public selectedOperation:number;
    public builtQuery:string;
    public queryTitle:string;

    constructor(selectedModule:number,selectedOperation:number,builtQuery:string,queryTitle:string){
        
        this.selectedModule=selectedModule;
        this.selectedOperation=selectedOperation;
        this.builtQuery=builtQuery;
        this.queryTitle=queryTitle;
    }
}