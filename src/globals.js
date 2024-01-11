import axios from "axios";

export default async function (){
	return await axios.get('/env-variables').then(result => result.data);
};