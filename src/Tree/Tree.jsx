import React, { useState } from 'react'
import {ICONS} from '../assests';
import TreeItem from './TreeItem/TreeItem';

export default function Tree(props) {
    const [openFolder,setOpenFolder] = useState(true);
    const {item,children,selectedCategory } = props;
    const showItem = item.category === selectedCategory || selectedCategory === 'default';

    return (
        <>
            {
                showItem && (
                    <div style={{marginTop:'1rem'}}>
                    <button onClick={() => setOpenFolder(!openFolder)} style={{background:'none',border:'0',cursor:'pointer'}}>
                        {
                            openFolder ? 
                            ICONS.openFolder :
                            ICONS.closeFolder
                        }
                    </button>
                    <span style={{marginLeft:'8px'}}>{item.title}</span>
                    {
                        (openFolder && children.length > 0 ) && children.map(item => 
                            <React.Fragment key={item.id}>
                                <TreeItem item={item} />
                            </React.Fragment>
                        )
                    }
                    </div>
                )
            }
        </>
    )
}
