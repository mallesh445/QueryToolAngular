// const baseAPIURL = "http://10.213.0.44:89/";  // GGKU2SER6 ip address
const baseAPIURL = "http://localhost:50527/";  // local

export const WebApiUrls = {

    ordersUrl: "https://jsonplaceholder.typicode.com/todos/",
    //ordersUrl: baseAPIURL + "api/Orders/",
    carriersUrl:baseAPIURL + "api/Carriers/",
    inventory: "",
    deleteModuleListURL: baseAPIURL + "api/Modules/DeleteModuleListById",
    allModulesUrl:baseAPIURL + "api/Modules/GetAllModules/",
    ModuleListByIdUrl:baseAPIURL + "api/Modules/GetModuleListbyModuleId/",
    ScriptDetailsByScriptIdUrl:baseAPIURL + "api/Modules/RetrieveScriptDetailsByScriptId/",
    ruleidUrl:baseAPIURL + "api/Rules/",
    wrodetailsUrl:baseAPIURL + "api/WRO/GetWRODetailsByWROId/",
    wroinfoURL:baseAPIURL + "api/WRO/GetWROInfoByWROId/",
    wropackinginfoURL:baseAPIURL + "api/WRO/GetWROInfoByWROId/",
    ScriptDetailsDataByScriptQuery:baseAPIURL + "api/Modules/GetScriptDetailsDataByScriptQuery",
    InsertScriptQueryUrl:baseAPIURL + "api/Modules/InsertNewQueryInScripts",
    UpdateScriptQueryUrl:baseAPIURL + "api/Modules/UpdateExistingQueryInScripts",
    UpdateQueryTitleByQueryId:baseAPIURL + "api/Modules/UpdateQueryTitleByQueryId"
}