import { useSelector } from "react-redux";

const useJWT = () => {
	const token = useSelector((state) => state.auth.token);
	return token;
};

export default useJWT;
