import React, { useState } from 'react'
import { ICONS } from '../../assests';
import './TreeItem.css';

export default function TreeItem(props) {
    const { item } = props;

    const [openModal,setOpenModal] = useState(false);

    return (
        <div style={{marginLeft:'3rem' , marginTop:'8px'}}>
            <div className='item-title' onClick={() => setOpenModal(true)}>
            {
                ICONS.item
            }
            {
                item.title
            }
            </div>
            <div className={`modal ${openModal ? '' : 'hide-modal'}`}>
                <div className='modal-content'>
                    <span className="close" onClick={() => setOpenModal(false)}>&times;</span>
                    <div className='category-desc'>
                        <span>Category: &emsp;</span>
                        <span>{item.category}</span>
                    </div>
                    <div className='category-desc'>
                        <span>Id: &emsp;</span>
                        <span>{item.id}</span>
                    </div>
                    <div className='category-desc'>
                        <span>Parent Object Id: &emsp;</span>
                        <span>{item.parent_objective_id}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
