import { Parameter } from "./Parameter.Model";

export class ScriptEntity{
       
    public ScriptId:number;
    public ModuleId:number;
    public OperationId:number;
    public Script:string;
    public Table:string;
    public Title:string;
    public Parameters:Parameter[]=[];

    constructor(ScriptId:number,ModuleId:number,OperationId:number,Script:string,Table:string,Title:string,listParams:Parameter[]){
        
        this.ScriptId=ScriptId;
        this.ModuleId=ModuleId;
        this.OperationId=OperationId;
        this.Script=Script;
        this.Table=Table;
        this.Title=Title;
        this.Parameters=listParams;
    }
}

