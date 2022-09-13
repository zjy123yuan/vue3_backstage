export interface RoleListInt{
  authority: number[]
  roleId: number
  roleName: string
}
export class RoleInitData{
  list:RoleListInt[]=[]
}