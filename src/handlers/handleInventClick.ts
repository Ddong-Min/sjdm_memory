export const handelInventClick=(
    inventClick : boolean,
    setInventClick : (invent : boolean)=>void)=>{
    setInventClick(!inventClick);
}