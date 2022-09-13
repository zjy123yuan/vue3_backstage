export interface AuthorityListInt{
  name:string
  roleId:number
  roleList?:AuthorityListInt[]
  viewRole?:string
}

export class authority{
  id:number
  authority:number[]
  constructor(id:number,authority:number[]){
    this.id=id
    this.authority=authority
    
  }
  list:AuthorityListInt[]=[]
  treeRef:any
}