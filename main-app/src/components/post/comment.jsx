import React from 'react'
import UserThumb from './userthumb.jsx'
export default function Comment(props){
	return(
		<div>
		<UserThumb profile={props.comment.user}/>
		<hr/>
		{props.comment.text}
		<img alt="" src={props.comment.image}/>
			<div className="post-lower">
                        <button className="like"> </button>
                        {props.comment.likes}
                        </div>
		</div>
	)
}
