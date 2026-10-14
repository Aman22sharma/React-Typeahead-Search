import React from 'react'

export default function TodoCard(props) {
    const { id, name, description } = props.todoData;

    return (
        <div className='container'>
            <div className="card border-success" style={{ Width: '18rem' }}>
                <div className="card-body text-success">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                </div>
                <div className="card-footer bg-transparent border-success">
                    <button type="button" className="btn btn-outline-primary">Edit</button>
                    <button onClick={() => props.onDelete(id)} type="button" className="btn btn-outline-danger mx-2">Delete</button>
                </div>
            </div>
        </div >
    )
}
