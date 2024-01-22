import {useNavigate} from 'react-router-dom';
import {LeftArrow} from './Icons.js';

export default function GoBack({cName}){
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate(-1);
	};

	return (
		<button className={cName} onClick={handleBackClick}><LeftArrow/></button>
	)
}