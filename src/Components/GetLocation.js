import {useLocation} from 'react-router-dom';

export default function GetLocation() {
    const location = useLocation();

    return location.pathname;
    //console.log(location.pathname); // Outputs the current pathname (e.g., /users)
    //console.log(location.search); // Outputs the query string (e.g., ?page=2)
    //console.log(location.hash); // Outputs the hash fragment (e.g., #comments)
}
