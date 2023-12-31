import { Link } from 'react-router-dom';


function NavBar() {

    return (
        <nav className="flex sm:justify-center space-x-4">
            {[
                ['Clients', '/clients'],
                ['Suppliers', '/suppliers'],
                ['Categories', '/categories'],
                ['Products', '/products'],
            ].map(([title, url]) => (
                <Link to={url}>  <a href={url} className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</a></Link>
            ))}
        </nav>
    )
}

export default NavBar;

