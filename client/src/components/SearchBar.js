//import { useHistory } from 'react-router-dom';

const SearchBar = ({ searchQuery, setSearchQuery }) => {    
    /*const history = useHistory();
    const onSubmit = (e) => {
        history.push(`?s=${searchQuery}`);
        e.preventDefault();
    };*/

    return (
    <form 
        action="/view-all" 
        method="get"
        autoComplete="off"
        //onSubmit={onSubmit}
    >
        <label htmlFor="header-search">
            <span className="visually-hidden">Search repository</span>
        </label>
        <input 
            //value={searchQuery}
            //onInput={(e) => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search for evidence (strong, agree, against, etc.)"
            name="s"
            size="50"
        />
        <button type="submit">Search</button>
    </form>
    );
};

export default SearchBar;