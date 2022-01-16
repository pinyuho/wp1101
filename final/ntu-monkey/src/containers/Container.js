import List from './List';
import Bar from '../components/Bar/index';
import Login from './login';
import SignUp from './signUp'
import Table from "./table"
import Profile from "./Profile"
import { useDialog } from "../hooks/Dialog"
import "../App.css"
const Container = () => {
  const {state, changeState} =  useDialog()

  const mystyle = {
    height: "100vh",
    width: "65%",
    margin: "auto"
  }
  return(
    <>
    {state === "sign_in"? <Login></Login>: 
      state === "sign_up"? <SignUp></SignUp>:
      state === "table"?<><Bar></Bar><Table></Table></>:
      state === "profile"?<><Bar></Bar><Profile></Profile></>:
      <><Bar></Bar><List></List></>
    }
    </>
  )
}
export default Container
