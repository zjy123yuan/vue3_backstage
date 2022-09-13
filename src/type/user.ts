export interface UserListInt{
  id:number
  nickName:string
  role:RoleInt[]
  userName:string
}
interface RoleInt{
  role:number
  roleName:string
}
interface RoleListInt{
  authority:number[]
  roleId:number
  roleName:string
}
interface SelectDataInt{
  nickName:string
  role:number
}
interface CheckedInt{
  id:number
  nickName:string
  role:number[]
  userName:string
}
export class InitData{
  list:UserListInt[]=[]
  selectData:SelectDataInt={
    nickName:'',
    role:0
  }
  roleList:RoleListInt[]=[]
  isShow=false
  checked:CheckedInt={
    id:0,
    nickName:'',
    role:[],
    userName:''
  }
}