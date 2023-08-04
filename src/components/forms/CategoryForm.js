import React from 'react';

const CategoryForm = ({
    value,
    setValue,
    handleSubmit,
    buttonText = "Submit",
    handleDelete
}) => {
    return (
        <div className='p-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" placeholder='Write Category Name' value={value} onChange={(e)=>setValue(e.target.value)} className="form-control" id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">{buttonText}</button>
                {handleDelete && (
                    <button onClick={handleDelete} className='btn btn-danger mt-3'>Delete</button>
                )}
            </form>
        </div>
    );
};

export default CategoryForm;