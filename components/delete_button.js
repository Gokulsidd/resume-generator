import { Button } from "./ui/button";

const DeleteButton = ({size,label,onClick}) => {
    return (
        <Button variant='default' size={size} onClick={onClick} className={'bg-red-500'} >{label}</Button>
    )
}
 
export default DeleteButton;