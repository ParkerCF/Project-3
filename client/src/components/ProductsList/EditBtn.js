import { memo } from "react";
import { useNavigate } from "react-router-dom";
function EditBtn({ pId }) {
    let navigate = useNavigate();
    function handleClick() {
        console.log(pId);
        navigate('/products/' + pId + '/edit');
    }
    return (
        <>
            <button className="btn btn-md btn-primary m-2" onClick={handleClick}>
                Edit
            </button>
        </>
    );
}

export default memo(EditBtn);