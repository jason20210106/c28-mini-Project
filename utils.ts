import jsonfile from "jsonfile";
import { ParsedQs } from "qs";

export function converStr2Arr(query:string | string[] | ParsedQs | ParsedQs[] |undefined ){
  if(typeof query === "undefined"){
    return query;
  }
  if(Array.isArray(query)){
    return query
  }else{
    return [query]
  }
}



export async function readJsonfile(filepath:string){
  const data = await jsonfile.readFile(filepath);
  return data;
}
export function writeJsonfile(){
    
}