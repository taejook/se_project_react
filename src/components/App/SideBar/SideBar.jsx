import avatar from "../../../assets/trueavatar.svg";
import "./SideBar.css";

function SideBar(){
    return (
    <div className="sidebar">
        <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
    </div>
    )
}
export default SideBar;