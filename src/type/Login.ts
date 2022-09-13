
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LoginFormInt{
  username:string,
  password:string
}
export class LoginData{
  ruleForm:LoginFormInt={
    username:"",
    password:"",
  }
}