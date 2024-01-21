import { Header as HeaderType } from "../Types";

const Header = (props: HeaderType)  => {
    return <h1>{props.name}</h1>;
};

export default Header;