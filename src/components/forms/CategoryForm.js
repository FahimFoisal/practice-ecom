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
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary mt-3">{buttonText}</button>
                    {handleDelete && (
                        <button onClick={handleDelete} className='btn btn-danger mt-3'>Delete</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CategoryForm;