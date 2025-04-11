import {useEffect, useRef, useState} from "react";
import './Inventory.css';
import { handelInventClick } from "../handlers/handleInventClick";

function Inventory(){
    const [inventClick, setInventClick] = useState<boolean>(false);
    return(
        <>
        {!inventClick && (
            <div className="InventoryButton">
                <p style={{fontSize:30}} onClick={()=>handelInventClick(inventClick,setInventClick)}>=</p>
            </div>
        )}
        {inventClick && (
            <div className="InventoryMain">
                <div className="Profile">
                    <div className="Picture"></div>
                    <div className="Nickname">
                        <p style={{fontSize:30}}>SJDM</p>
                    </div>
                </div>
                <button className = "History">
                    <div className="DetailHistory"></div>
                </button>
                <div className="InventoryClose" onClick={()=>handelInventClick(inventClick, setInventClick)}></div>
            </div>
        )}
        </>
    );
}

export default Inventory;