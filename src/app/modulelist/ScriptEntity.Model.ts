import { Parameters } from "./Parameters.model";

export class ScriptEntity{
       
    public ScriptId:number;
    public ModuleId:number;
    public OperationId:number;
    public Script:string;
    public Table:string;
    public Title:string;
    public Parameters:Parameters[]=[];

    constructor(ScriptId:number,ModuleId:number,OperationId:number,Script:string,Table:string,Title:string,listParams:Parameters[]){
        
        this.ScriptId=ScriptId;
        this.ModuleId=ModuleId;
        this.OperationId=OperationId;
        this.Script=Script;
        this.Table=Table;
        this.Title=Title;
        this.Parameters=listParams;
    }
}

