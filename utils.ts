import jsonfile from "jsonfile";

export async function readJsonfile(filepath:string){
  const data = await jsonfile.readFile(filepath);
  return data;
}
export function writeJsonfile(){
    
}