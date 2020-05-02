import React from 'react'

const ListView = props => {
    const { data } = props;
    return (
       <ul>
           {
               data.map(li=>{
                   return(
                       <li>
                           {li.description}  {li.amount}
                       </li>
                   )
               })
           }
       </ul>
    )
}

export default ListView;